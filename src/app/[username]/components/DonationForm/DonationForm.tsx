"use client";

import { useEffect, useState } from "react";
import { useInitData, useMainButton } from "@tma.js/sdk-react";
import { Input } from "@/components/ui/Input/Input";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import cls from "./styles.module.scss";
import { useTonWallet } from "@tonconnect/ui-react";
import { TonRate } from "@/components/TonRate/TonRate";
import { User } from "@/types/User";
import { saveDonate } from "../../actions/saveDonate";
import { useTransaction } from "../../hooks/useTransaction";
import { useNumberInput } from "@/hooks/useNumberInput";
import { useTonRate } from "@/hooks/useTonRate";
import TelegramService from "@/services/telegramService";
import { decrypt } from "@/helpers/crypto";

interface Props {
  minDonate: number;
  recipient: User;
}

const telegramService = new TelegramService();

export const DonationForm = ({ minDonate, recipient }: Props) => {
  const [donatorName, setDonatorName] = useState("");
  const [donationMessage, setDonationMessage] = useState("");
  const [tipAmount, handleChange] = useNumberInput(minDonate.toString());

  const mainButton = useMainButton();
  const wallet = useTonWallet();
  const { createTransaction } = useTransaction();
  const [tonRate] = useTonRate();
  const initData = useInitData();

  useEffect(() => {
    mainButton.setText("Donate!");
    mainButton.enable();
    (wallet?.account && donatorName && donationMessage)
      ? mainButton.show()
      : mainButton.hide();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.account, donatorName, donationMessage]);

  useEffect(() => {
    const handleClick = async () => {
      if (Number(tipAmount) < minDonate) {
        alert(`Minimum amount: ${minDonate} TON`);
        return;
      }

      if (wallet?.account) {
        mainButton.hide();
        try {
          // Send Transaction
          const tonAddress = await decrypt(recipient.tonAddress);
          await createTransaction(tonAddress, Number(tipAmount))
            .then(async () => {              
              if (initData?.user) {
                alert("Donation sent successfully! Thank you!");

                const tipAmountNum = Number(tipAmount);
                const message = telegramService.chequeMessage(recipient.username, tipAmountNum, tipAmountNum * tonRate, donationMessage);

                telegramService.sendMessage(initData.user?.id, message);

                // Create a record in DB
                await saveDonate({
                  senderName: donatorName,
                  message: donationMessage,
                  tipAmount: Number(tipAmount),
                  senderWalletAddress: wallet?.account?.address.toString(),
                  recipientId: recipient.id,
                  recipientUsername: recipient.username,
                  recipientWalletAddress: recipient.tonAddress,
                  senderTelegramId: initData?.user?.id
                });
              }
            });
        } catch (error) {
          console.log(error);
        } finally {
          mainButton.show();
        }
      }
    };

    mainButton.on("click", handleClick);
    return () => mainButton.off("click", handleClick);
  }, [tipAmount, donatorName, donationMessage, minDonate, mainButton, recipient, wallet?.account, createTransaction, initData?.user, tonRate]);

  return (
    <>
      <div>
        <Input
          secondary
          label="Your nickname"
          placeholder="John Doe"
          maxLength={25}
          value={donatorName}
          onChange={(e) => setDonatorName(e.target.value)}
        />
        <Input
          secondary
          value={tipAmount.toString()}
          onChange={handleChange}
          label="Your tip amount"
          type="text"
          inputMode="decimal"
          placeholder="Tip"
          style={{ marginTop: 12 }}
        />
        <span className={cls.minDonate}>Minimum amount: <b>{minDonate} TON</b></span>
        <br />
        <TonRate tonRate={(tonRate * Number(tipAmount))} />
      </div>
      <div style={{ marginTop: 12 }}>
        <Textarea
          secondary
          placeholder="Your message here..."
          value={donationMessage}
          onChange={(e) => setDonationMessage(e.target.value)}
          maxLength={200}
        />
      </div>
    </>
  );
};