"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../../components/ui/Input/Input";
import { Logo } from "../../components/ui/Logo/Logo";
import cls from "./register.module.scss";
import { useRouter } from "next/navigation";
import { UserRoles } from "@/enums/UserRoles";
import { Select } from "@/components/ui/Select/Select";
import { ActionTypes } from "./context/types";
import { useRegistration } from "./context/RegistrationContext";
import { useBackButton, useInitData, useMainButton } from "@tma.js/sdk-react";
import { usernameValidation } from "../../helpers/usernameValidation";
import { Popup } from "@/components/ui/Popup/Popup";

export default function Register() {
  const router = useRouter();
  const [{ username, role }, dispatch] = useRegistration();
  const initData  = useInitData();
  const mainButton = useMainButton();
  const backButton = useBackButton();
  const [invalidPopupOpen, setInvalidPopupOpen] = useState(false);
  
  const [formState, setFormState] = useState({
    isValid: false,
    isButtonVisible: false
  });

  useEffect(() => {
    dispatch({ type: ActionTypes.CHANGE_TELEGRAM_ID, payload: initData?.user?.id });

    backButton.show();
    backButton.on('click', () => router.back());

    mainButton.setText("Next step");

    const handleMainButtonClick = async () => {
      const response = await fetch(`/api/user/exists/${username}`);
      const userWithUsernameExists = await response.json();

      if (!userWithUsernameExists) {
        router.push('/register/addPaymentInfo');
      } else {
        setInvalidPopupOpen(true);
      }
    };
    mainButton.on('click', handleMainButtonClick);

    return () => mainButton.off('click', handleMainButtonClick);
  }, [router, mainButton, backButton, initData, dispatch, username]);
  
  // Validation function
  const validateUsername = (username: string) => {
    const isValid = usernameValidation(username);
    
    setFormState({
      isValid,
      isButtonVisible: isValid,
    });
  };

  // Show/hide main button
  useEffect(() => {
    formState.isButtonVisible ? mainButton.show() : mainButton.hide();
  }, [formState.isButtonVisible, mainButton]);

  const usernameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionTypes.CHANGE_USERNAME, payload: e.target.value });
    validateUsername(e.target.value);
  };

  return (
    <>
      <Popup
        isOpen={invalidPopupOpen}
        onButtonClick={() => setInvalidPopupOpen(false)}
        status="ERROR"
        title="Error"
        message="User with this username already exists"
        buttonText="Try again!"
      />
      <div className={cls.container}>
        <div>
          <Logo />
          <p>Getting started with</p>
        </div>
        <div className={cls.registerForm}>
          <div className={cls.registerFormNickname}>
            <Input
              label="Your nickname"
              type="text"
              placeholder="azizov"
              value={username}
              onChange={usernameHandler}
              invalid={username.length > 0 && !formState.isValid}
            />
            {username.length > 0 && !formState.isValid && (
              <p className={cls.invalid}>Nickname must only contain alphanumeric characters.</p>
            )}
          </div>
          <div className={cls.registerFormCrypto}>
            <label>Choose your role</label>
            <Select
              value={role}
              onChange={(e) => dispatch({ type: ActionTypes.CHANGE_ROLE, payload: (e.target.value as UserRoles) })}
              options={Object.entries(UserRoles).map(([key, value]) => ({ label: key, value }))}
            />
          </div>
        </div>
      </div>
    </>
  );
}