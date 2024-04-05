"use client";

import { useEffect } from "react";
import { useBackButton, useMainButton, useMiniApp } from "@tma.js/sdk-react";
import cls from "./styles.module.scss";

export default function RegisterSuccess() {
  const mainButton = useMainButton();
  const backButton = useBackButton();
  const miniApp = useMiniApp();

  useEffect(() => {
    backButton.hide();
    mainButton.setText("Exit");

    const handleClick = () => {
      miniApp.close();
    };

    mainButton.on('click', handleClick);

    return () => mainButton.off('click', handleClick);
  });

  return (
    <div className={cls.container}>
      <div style={{ textAlign: "center" }}>
        <h2>Registration failed 🚫</h2>
        <p>Unfortunately you have not been registered, please try again later 😔</p>
      </div>
    </div>
  );
}