"use client";

import { useEffect, useState } from "react";
import { useMainButton } from "@tma.js/sdk-react";
import { Input } from "@/components/ui/Input/Input";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import cls from "./styles.module.scss";
import { useTonWallet } from "@tonconnect/ui-react";
import { TonRate } from "../TonRate/TonRate";

interface Props {
  minDonate: number;
}

export const DonationForm = ({ minDonate }: Props) => {
  const [donatorName, setDonatorName] = useState("");
  const [donationMessage, setDonationMessage] = useState("");  
  const [tipAmount, setTipAmount] = useState(minDonate.toString());
  const mainButton = useMainButton();
  const wallet = useTonWallet();

  useEffect(() => {
    if (wallet?.account && donatorName && donationMessage) {
      mainButton.setText("Donate!");
      mainButton.enable();
      mainButton.show();
    } else {
      mainButton.hide();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.account, donatorName, donationMessage]);

  useEffect(() => {
    const handleClick = () => {
      if (Number(tipAmount) < minDonate) {
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
          onChange={(e) => {
            let amount = e.target.value;

            if (!amount || amount.match(/^\d{1,}(\,|\.\d{0,4})?$/)) {
              amount = amount.replace(",", ".");
              setTipAmount(amount);
            }
          }}
          label="Your tip amount"
          type="text"
          inputMode="decimal"
          placeholder="Tip"
          style={{ marginTop: 12 }}
        />
        <span className={cls.minDonate}>Minimum amount: <b>{minDonate} TON</b></span>
        <br />
        <span className={cls.minDonate}>
          <TonRate tipAmount={Number(tipAmount)} />
        </span>
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