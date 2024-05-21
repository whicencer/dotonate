"use client";

import { Textarea } from "@/components/ui/Textarea/Textarea";
import { getDonateById } from "./actions/getDonateById";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/Loader/Loader";
import { Donation } from "@/types/Donation";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import TelegramService from "@/services/telegramService";
import { User } from "@/components/icons/User/User";
import cls from "./styles.module.scss";
import { Panel } from "@/components/ui/Panel/Panel";

interface DonationAnswerPageProps {
  params: { donationId: string }
}

const telegramService = new TelegramService();

export default function DonationAnswerPage({ params }: DonationAnswerPageProps) {
  const { donationId } = params;
  const [donation, setDonation] = useState<Donation | null>(null);
  const [message, setMessage] = useState("");
  const backButton = useBackButton();
  const mainButton = useMainButton();

  useEffect(() => {
    if (donation) {
      mainButton.show();
      mainButton.setText("Answer it!");
      mainButton.enable();
    }

    const handleClick = () => {
      if (!message.length) {
        alert("Please, enter your answer!");
        return;
      }
      if (donation?.senderTelegramId !== undefined) {
        telegramService.sendMessage(donation.senderTelegramId, `💬 Answer from <b>${donation.recipientUsername}</b> on your Dotonate:\n
${message}`)
          .then(() => {
            alert("Answer has been successfully sent!");
          });
      }
    };

    mainButton.on('click', handleClick);

    return () => mainButton.off('click', handleClick);
  }, [mainButton, donation, message]);

  useEffect(() => {
    const handleClick = () => {
      window.history.back();
      backButton.hide();
      mainButton.hide();
    };

    backButton.show();
    backButton.on('click', handleClick);

    return () => backButton.off('click', handleClick);
  }, [backButton, mainButton]);
  
  useEffect(() => {
    async function getDonate(donationId: number) {
      const donation = await getDonateById(donationId);
      setDonation(donation);
    }

    getDonate(Number(donationId));
  }, [donationId]);

  if (donation === null) return <Loader />;
  return (
    <div className={cls.donation}>
      <div className={cls.header}>
        <User />
        <span>Dotonate from <strong>{donation?.senderName}</strong></span>
      </div>
      <div className={cls.information}>
        <h2>+{donation.sum} <span>TON</span></h2>
        <span>November 8 at 8:40 AM</span>
      </div>
      <div className={cls.donationMessage}>
        <Panel>
          <span>Donation message</span>
          <p>{donation?.message}</p>
        </Panel>
      </div>
      <div className={cls.answer}>
        <span>Your answer</span>
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Enter your answer here..."
        />
      </div>
    </div>
  );
}