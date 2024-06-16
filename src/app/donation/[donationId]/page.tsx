"use client";

import { getDonateById } from "./actions/getDonateById";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Loader } from "@/components/ui/Loader/Loader";
import { Donation } from "@/types/Donation";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import cls from "./styles.module.scss";
import { formatDate } from "@/helpers/formatDate";
import { useRouter } from "next/navigation";
import { DonationHeader } from "./components/DonationHeader";
import { DonationMessage } from "./components/DonationMessage";
import { DonationAnswer } from "./components/DonationAnswer";
import { sendAnswer } from "./actions/sendAnswer";
import { Popup } from "@/components/ui/Popup/Popup";
import { popupInitState, popupReducer } from "./reducer/PopupReducer";
import { ActionTypes } from "./reducer/types";

interface DonationAnswerPageProps {
  params: { donationId: string }
}

export default function DonationAnswerPage({ params }: DonationAnswerPageProps) {
  const { donationId } = params;
  const [donation, setDonation] = useState<Donation | null>(null);
  const [answer, setAnswer] = useState("");
  const [popupState, dispatch] = useReducer(popupReducer, popupInitState);
  const backButton = useBackButton();
  const mainButton = useMainButton();
  const router = useRouter();

  // Function to fetch donation
  const fetchDonation = useCallback(async (id: number) => {
    try {
      const fetchedDonation = await getDonateById(id);
      setDonation(fetchedDonation);
    } catch (error) {
      console.error("Error fetching donation:", error);
    }
  }, []);

  useEffect(() => {
    fetchDonation(Number(donationId));
  }, [donationId, fetchDonation]);

  // Button to send answer
  const handleMainButtonClick = useCallback(async () => {
    if (!answer.trim()) {
      dispatch({ type: ActionTypes.SHOW_ERROR_EMPTY });
      return;
    }

    if (donation?.senderTelegramId) {
      mainButton.hide();
      try {
        await sendAnswer(answer, donation.id, donation.recipientUsername, donation.senderTelegramId);
        dispatch({
          type: ActionTypes.SHOW_SUCCESS,
          payload: () => router.push(`/profile`)
        });
      } catch (error) {
        console.error("Error while sending answer:", error);
        dispatch({ type: ActionTypes.SHOW_ERROR });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donation, answer]);

  useEffect(() => {
    if (donation && !donation.answered) {
      mainButton.show();
      mainButton.setText("Answer it!");
      mainButton.enable();
      mainButton.on('click', handleMainButtonClick);
    }

    return () => mainButton.off('click', handleMainButtonClick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donation, handleMainButtonClick]);

  // Button to go back
  const handleBackButtonClick = useCallback(() => {
    mainButton.hide();
    backButton.hide();
    router.back();
  }, [mainButton, backButton, router]);

  useEffect(() => {
    backButton.show();
    backButton.on('click', handleBackButtonClick);

    return () => backButton.off('click', handleBackButtonClick);
  }, [backButton, handleBackButtonClick]);

  if (donation === null) return <Loader />;
  return (
    <>
      <Popup
        title={popupState.popupContent.title}
        message={popupState.popupContent.message}
        buttonText={popupState.popupContent.buttonText}
        status={popupState.popupContent.status}
        isOpen={popupState.isSuccessPopupVisible || popupState.isErrorPopupVisible || popupState.isInfoPopupVisible}
        onButtonClick={popupState.popupContent.onButtonClick}
      />
      <div className={cls.donation}>
        <DonationHeader senderName={donation.senderName} />
        <div className={cls.information}>
          <h2>+{donation.sum} <span>TON</span></h2>
          <span>{formatDate(donation.createdAt)}</span>
        </div>
        <DonationMessage message={donation.message} />
        {
          donation.answered
            ? <span className={cls.answered}>You have already answered this donation</span>
            : <DonationAnswer message={answer} setMessage={setAnswer} />
        }
      </div>
    </>
  );
}