"use client";

import { useEffect } from "react";
import { useMainButton } from "@tma.js/sdk-react";
import { useUserData } from "@/hooks/useUserData";
import { Loader } from "@/components/ui/Loader/Loader";
import { notFound } from "next/navigation";
import { Panel } from "@/components/ui/Panel/Panel";
import { DonationForm } from "./components/DonationForm/DonationForm";
import { TonConnectButton } from "@tonconnect/ui-react";
import cls from "./styles.module.scss";

interface DonationPageProps {
  params: { username: string }
}

export default function DonationPage({ params }: DonationPageProps) {
  const { user, isLoading, error } = useUserData(params.username);
  
  const mainButton = useMainButton();

  useEffect(() => {
    if (!isLoading) {
      mainButton.setText("Donate!");
      mainButton.enable();
      mainButton.show();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) return <Loader />
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
        <DonationForm minDonate={user.minDonate} />
      </Panel>
    </div>
  );
}