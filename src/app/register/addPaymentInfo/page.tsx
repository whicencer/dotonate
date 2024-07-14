"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { Logo } from "@/components/ui/Logo/Logo";
import cls from "./addPaymentInfo.module.scss";
import { useRegistration } from "../context/RegistrationContext";
import Image from "next/image";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { createUser } from "../actions/createUser";

export default function AddPaymentInfo() {
  const [{ username, role, telegramId }] = useRegistration();
  const router = useRouter();
  const mainButton = useMainButton();
  const backButton = useBackButton();
  const tonAddress = useTonAddress();

  useEffect(() => {
    const handleBackClick = () => router.back();
    backButton.on("click", handleBackClick);
    mainButton.hide();

    return () => {
      backButton.off("click", handleBackClick);
    };
  }, [backButton, mainButton, router]);

  useEffect(() => {
    const handleRegister = async () => {
      if (telegramId) {
        try {
          await createUser({
            username,
            role,
            telegramId,
            tonAddress
          });
    
          router.push("../profile");
          backButton.hide();
        } catch (error) {
          router.push("failed");
          console.log(error);
        }
      }
    };

    if (tonAddress) {
      handleRegister();
    }
  }, [router, username, role, tonAddress, telegramId]);

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <Logo />
        <p>Connect your wallet to receive donations</p>
        <Image src={"/money.gif"} alt="money" width={195} height={195} />
      </div>
      {
        !tonAddress
          ? <TonConnectButton className={cls.tonConnectBtn} />
          : <p style={{ marginTop: 20 }}>Successfully connected! <br /> You will be redirected shortly. Please wait...</p>
      }
    </div>
  );
}