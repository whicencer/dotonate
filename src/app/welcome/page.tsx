"use client";

import cls from "./styles.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../../components/ui/Logo/Logo";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { Toncoin } from "@/components/Toncoin/Toncoin";

export default function Home() {
  const router = useRouter();
  const mainButton = useMainButton();
  const backButton = useBackButton();

  useEffect(() => {
    backButton.hide();
    mainButton.setText("Get started");
    mainButton.enable().show();
    const handleClick = () => {
      router.push("/register");
    };

    mainButton.on('click', handleClick);
    return () => mainButton.off('click', handleClick);
  });

  return (
    <div className={cls.container}>
      <Logo />
      <Toncoin />
      <p>Accept and make crypto donations on Telegram ease with <span>Dotonate</span></p>
    </div>
  );
}