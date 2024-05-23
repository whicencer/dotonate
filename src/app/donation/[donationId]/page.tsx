"use client";

import { getDonateById } from "./actions/getDonateById";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "@/components/ui/Loader/Loader";
import { Donation } from "@/types/Donation";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import TelegramService from "@/services/telegramService";
import cls from "./styles.module.scss";
import { formatDate } from "@/helpers/formatDate";
import { useRouter } from "next/navigation";
import { DonationHeader } from "./components/DonationHeader";
import { DonationMessage } from "./components/DonationMessage";
import { DonationAnswer } from "./components/DonationAnswer";

interface DonationAnswerPageProps {
  params: { donationId: string }
}

const telegramService = new TelegramService();

export default function DonationAnswerPage({ params }: DonationAnswerPageProps) {
  const { donationId } = params;
  const [donation, setDonation] = useState<Donation | null>(null);
  const [answer, setAnswer] = useState("");
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
      alert("Please, enter your answer!");
      return;
    }

    if (donation?.senderTelegramId) {
      try {
        await telegramService.sendMessage(
          donation.senderTelegramId,
          `💬 Answer from <b>${donation.recipientUsername}</b> on your Donation:\n\n${answer}`
        );
        alert("Answer has been successfully sent!");
      } catch (error) {
        console.error("Error while sending answer:", error);
        alert("Failed to send answer :(");
      }
    }
  }, [donation, answer]);

  useEffect(() => {
    if (donation) {
      mainButton.show();
      mainButton.setText("Answer it!");
      mainButton.enable();
      mainButton.on('click', handleMainButtonClick);
    }

    return () => mainButton.off('click', handleMainButtonClick);
  }, [mainButton, donation, handleMainButtonClick]);

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
    <div className={cls.donation}>
      <DonationHeader senderName={donation.senderName} />
      <div className={cls.information}>
        <h2>+{donation.sum} <span>TON</span></h2>
        <span>{formatDate(donation.createdAt)}</span>
      </div>
      <DonationMessage message={donation.message} />
      <DonationAnswer message={answer} setMessage={setAnswer} />
    </div>
  );
}