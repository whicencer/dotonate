"use client";

import { useEffect } from "react";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import cls from "./styles.module.scss";
import { useRouter } from "next/navigation";

export default function RegisterSuccess() {
  const mainButton = useMainButton();
  const backButton = useBackButton();
  const router = useRouter();
  
  useEffect(() => {
    backButton.hide();
    mainButton.show();
    mainButton.setText("Go to account");

    const handleClick = () => {
      mainButton.hide();
      router.push('../../profile');
    };

    mainButton.on('click', handleClick);

    return () => mainButton.off('click', handleClick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cls.container}>
      <div style={{ textAlign: "center" }}>
        <h2>Good job 🎉</h2>
        <p>Now you can enter your personal cabinet and start accepting donations 👇</p>
      </div>
    </div>
  );
}