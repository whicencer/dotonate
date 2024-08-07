/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { memo, useEffect, useState } from "react";
import { useInitData, useMainButton } from "@tma.js/sdk-react";
import { Input } from "@/components/ui/Input/Input";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import cls from "./styles.module.scss";
import { useTonWallet } from "@tonconnect/ui-react";
import { User } from "@/types/User";
import { saveDonate } from "../../actions/saveDonate";
import { useTransaction } from "../../hooks/useTransaction";
import { useNumberInput } from "@/hooks/useNumberInput";
import TelegramService from "@/services/telegramService";
import { decrypt } from "@/helpers/crypto";
import { Button } from "@telegram-apps/telegram-ui";

interface Props {
  minDonate: number;
  recipient: User;
  tonRate: number;
  transferDonationTipAmountToParent: (donation: number) => void;
}

const telegramService = new TelegramService();

export const DonationForm = ({ minDonate, recipient, tonRate, transferDonationTipAmountToParent }: Props) => {
  const [donatorName, setDonatorName] = useState("");
  const [donationMessage, setDonationMessage] = useState("");
  const [tipAmount, handleTipAmountChange, setTipAmount] = useNumberInput(minDonate.toString());
  const numberedTipAmount = Number(tipAmount);

  const [isCustomTip, setIsCustomTip] = useState(false);

  useEffect(() => {
    transferDonationTipAmountToParent(numberedTipAmount);
  }, [tipAmount, transferDonationTipAmountToParent]);

  const mainButton = useMainButton();
  const wallet = useTonWallet();
  const { createTransaction } = useTransaction();
  const initData = useInitData();

  useEffect(() => {
    mainButton.setText("Donate!");
    mainButton.enable();
  }, []);

  useEffect(() => {
    (wallet?.account && donatorName && donationMessage)
      ? mainButton.show()
      : mainButton.hide();
  }, [wallet?.account, donatorName, donationMessage]);

  useEffect(() => {
    const handleClick = async () => {
      if (numberedTipAmount < minDonate) {
        alert(`Minimum amount: ${minDonate} TON`);
        return;
      }

      if (wallet?.account) {
        mainButton.hide();
        try {
          // Send Transaction
          const tonAddress = await decrypt(recipient.tonAddress);
          await createTransaction(tonAddress, numberedTipAmount)
            .then(async () => {
              if (initData?.user) {
                alert("Donation sent successfully! Thank you!");

                const message = telegramService.chequeMessage(
                  recipient.username,
                  numberedTipAmount,
                  numberedTipAmount * tonRate,
                  donationMessage
                );
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
          label="Your name"
          placeholder="John Doe"
          maxLength={25}
          value={donatorName}
          onChange={(e) => setDonatorName(e.target.value)}
        />
        <div className={cls.tipAmount}>
          <label>Tip amount</label>
          <div className={cls.tipButtons}>
            {
              Array.from({ length: 4 }).map((_, index) => {
                const value = minDonate < 1 ? 2 ** index : minDonate * (2 ** index);
                return (
                  <Button
                    key={index}
                    mode="bezeled"
                    onClick={() => {
                      setIsCustomTip(false);
                      setTipAmount(value.toString());
                    }}
                    className={value === numberedTipAmount && !isCustomTip ? cls.selected : ""}
                  >
                    {value} TON
                  </Button>
                );
              })
            }
            <Button
              mode="bezeled"
              data-value={'custom'}
              onClick={() => {
                setIsCustomTip(true);
              }}
              className={isCustomTip ? cls.selected : ""}
            >Custom</Button>
          </div>
        </div>
        
        {
          isCustomTip
            ? <Input
                secondary
                value={tipAmount.toString()}
                onChange={handleTipAmountChange}
                label="Tip amount"
                type="text"
                inputMode="decimal"
                placeholder="Tip"
                style={{ marginTop: 12 }}
              />
            : null
        }
        <span className={cls.minDonate}>Minimum amount: <b>{minDonate} TON</b></span>
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

export const DonationFormMemo = memo(DonationForm);