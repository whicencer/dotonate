"use client";

import { Input } from "@/components/ui/Input/Input";
import cls from "./styles.module.scss";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { useMainButton } from "@tma.js/sdk-react";
import { useUserData } from "@/hooks/useUserData";
import { Loader } from "@/components/ui/Loader/Loader";

interface DonationPageProps {
  params: { username: string }
}

export default function DonationPage({ params }: DonationPageProps) {
  const { user, isLoading } = useUserData(params.username);
  const [tipAmount, setTipAmount] = useState(1);
  const mainButton = useMainButton();

  useEffect(() => {
    const minDonate = user?.minDonate;

    if (minDonate) {
      setTipAmount(minDonate);
    }
  }, [user?.minDonate]);

  useEffect(() => {
    mainButton.setText("Donate!");
    mainButton.enable();
    mainButton.show();
  });

  if (isLoading) return <Loader />
  return (
    <div>
      <h2>Make a donation</h2>
      <div className={cls.panel}>
        <h3>@{user.username}</h3>
        <span>{user.description}</span>
      </div>
      <div className={cls.panel}>
        <div>
          <Input
            secondary
            label="Your nickname"
            placeholder="John Doe"
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
          <span className={cls.minDonate}>Minimum amount: <b>{user?.minDonate} TON</b></span>
        </div>
        <div style={{ marginTop: 12 }}>
          <Textarea secondary placeholder="Your message here..." />
        </div>
      </div>
    </div>
  );
}