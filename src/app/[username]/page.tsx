"use client";

import { useUserData } from "@/hooks/useUserData";
import { Loader } from "@/components/ui/Loader/Loader";
import { notFound } from "next/navigation";
import { Panel } from "@/components/ui/Panel/Panel";
import { DonationFormMemo } from "./components/DonationForm/DonationForm";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useWallet } from "@/hooks/useWallet";
import { useTonRate } from "@/hooks/useTonRate";
import { useCallback, useEffect, useMemo, useState } from "react";

interface DonationPageProps {
  params: { username: string }
}

export default function DonationPage({ params }: DonationPageProps) {
  const { user, isLoading, error } = useUserData(params.username);
  const [donationSum, setDonationSum] = useState(0);
  const { balance, isAuth } = useWallet();
  const [tonRate] = useTonRate();

  useEffect(() => {
    if (user) {
      setDonationSum(user.minDonate);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const calculatedAmount = useMemo(() => {
    return (donationSum * tonRate).toFixed(2);
  }, [donationSum, tonRate]);

  const onTipAmountChange = useCallback((donation: number) => {
    setDonationSum(donation);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;
  if (error) {
    notFound();
  }
  return (
    <div>
      <h2>Make a donation</h2>
      <TonConnectButton style={{ marginTop: 10 }} />
      <Panel>
        <h3 style={{ marginBottom: 7 }}>@{user.username}</h3>
        <span>{user.description || "No description."}</span>
      </Panel>
      <Panel>
        <DonationFormMemo
          tonRate={tonRate}
          minDonate={user.minDonate}
          recipient={user}
          transferDonationTipAmountToParent={onTipAmountChange}
        />
      </Panel>
      {
        isAuth
          ? <Panel>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ marginBottom: 7, fontWeight: 400, fontSize: 16 }}>Your balance</h3>
                <span>{balance} TON</span>
              </div>
              <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ marginBottom: 7, fontWeight: 400, fontSize: 16 }}>TON Price</h3>
                <span>${tonRate}</span>
              </div>
              <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ marginBottom: 7, fontWeight: 400, fontSize: 16 }}>To pay</h3>
                <span>{donationSum} TON ≈ ${calculatedAmount}</span>
              </div>
            </Panel>
          : null
      }
    </div>
  );
}