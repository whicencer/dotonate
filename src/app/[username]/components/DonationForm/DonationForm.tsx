"use client";

import { useEffect, useState } from "react";
import { useMainButton } from "@tma.js/sdk-react";
import { Input } from "@/components/ui/Input/Input";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import cls from "./styles.module.scss";

interface Props {
  minDonate: number;
}

export const DonationForm = ({ minDonate }: Props) => {
  const [donatorName, setDonatorName] = useState("");
  const [donationMessage, setDonationMessage] = useState("");  
  const [tipAmount, setTipAmount] = useState(minDonate);
  const mainButton = useMainButton();

  useEffect(() => {
    const handleClick = () => {
      if (tipAmount < minDonate) {
        alert(`Please enter a tip amount greater than ${minDonate} TON`);
        return;
      }
      alert(`Thank you, ${donatorName} for your ${tipAmount} TON donation! Your message was: ${donationMessage}`);
    };

    mainButton.on("click", handleClick);
    return () => mainButton.off("click", handleClick);
  }, [tipAmount, donatorName, donationMessage, minDonate, mainButton]);

  return (
    <>
      <div>
        <Input
          secondary
          label="Your nickname"
          placeholder="John Doe"
          value={donatorName}
          onChange={(e) => setDonatorName(e.target.value)}
        />
        <Input
          secondary
          value={tipAmount.toString()}
          onChange={(e) => setTipAmount(Number(e.target.value))}
          label="Your tip amount"
          type="number"
          min={tipAmount}
          inputMode="numeric"
          placeholder="Tip"
          style={{ marginTop: 12 }}
        />
        <span className={cls.minDonate}>Minimum amount: <b>{minDonate} TON</b></span>
      </div>
      <div style={{ marginTop: 12 }}>
        <Textarea
          secondary
          placeholder="Your message here..."
          value={donationMessage}
          onChange={(e) => setDonationMessage(e.target.value)}
        />
      </div>
    </>
  );
};