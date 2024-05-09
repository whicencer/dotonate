"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { Logo } from "@/components/ui/Logo/Logo";
import cls from "./addPaymentInfo.module.scss";
import { Input } from "@/components/ui/Input/Input";
import { useRegistration } from "../context/RegistrationContext";
import { ActionTypes } from "../context/types";
import Image from "next/image";
import { createUser } from "../actions/createUser";

export default function AddPaymentInfo() {
  const [{ username, tonAddress, role, telegramId }, dispatch] = useRegistration();
  const router = useRouter();
  const mainButton = useMainButton();
  const backButton = useBackButton();

  useEffect(() => {
    backButton.on("click", () => router.back());
    mainButton.setText("Finish!");

    const handleClick = async () => {
      if (!tonAddress) {
        alert("Please, enter your TON wallet address");
        return;
      }

      if (telegramId) {
        try {
          await createUser({
            username,
            role,
            telegramId,
            tonAddress
          });
  
          router.push("success");
        } catch (error) {
          router.push("failed");
          console.log(error);
        }
      }
    };

    mainButton.on("click", handleClick);

    return () => {
      mainButton.off("click", handleClick);
    };
  }, [mainButton, router, backButton, username, role, tonAddress, telegramId]);

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <Logo />
        <p>Enter your payment information in the field below</p>
        <Image src={"/money.gif"} alt="money" width={195} height={195} />
      </div>
      <div className={cls.input}>
        <Input
          value={tonAddress}
          onChange={(e) => dispatch({ type: ActionTypes.CHANGE_TON_ADDRESS, payload: e.target.value })}
          placeholder="Enter your TON address"
          label="TON address"
        />
        <span>Carefully check the entered wallet address for accuracy.
          Errors in the address may lead to loss of funds.</span>
      </div>
    </div>
  );
}