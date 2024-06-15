"use client";

import { Input } from "@/components/ui/Input/Input";
import { Loader } from "@/components/ui/Loader/Loader";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useBackButton, useInitDataRaw, useMainButton } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { editUser } from "./services/editUser";
import { useNumberInput } from "@/hooks/useNumberInput";
import { TonRate } from "@/components/TonRate/TonRate";
import { useTonRate } from "@/hooks/useTonRate";
import { Popup } from "@/components/ui/Popup/Popup";

export default function EditProfile() {
  const initDataRaw = useInitDataRaw();
  const { user, isLoading } = useUserProfile(initDataRaw);
  const [tonRate] = useTonRate();

  const [minValue, handleChangeMinValue, setMinValue] = useNumberInput("1.00");
  const [description, setDescription] = useState("");
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
  
  const router = useRouter();
  const backButton = useBackButton();
  const mainButton = useMainButton();

  useEffect(() => {
    if (user && user.minDonate) {
      setMinValue(user.minDonate.toString());
      setDescription(user.description);
    }
  }, [setMinValue, user]);

  useEffect(() => {
    if (!isLoading) {
      mainButton.show();
      mainButton.setText("Save");
      mainButton.enable();
      backButton.show();
    }
      
    const handleBackButtonClick = () => {
      router.push('/profile');
      backButton.hide();
      mainButton.hide();
    };

    const handleMainButtonClick = async () => {
      mainButton.hide();
      try {
        const response = await editUser(Number(minValue), description, initDataRaw);
        
        if (response.ok) {
          setIsSuccessPopupVisible(true);
          backButton.hide();
        } else {
          setIsErrorPopupVisible(true);
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.log("Error while updating profile: ", error);
      }
    };

    mainButton.on('click', handleMainButtonClick);
    backButton.on('click', handleBackButtonClick);

    return () => {
      mainButton.off('click', handleMainButtonClick);
      backButton.off('click', handleBackButtonClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minValue, description, initDataRaw, isLoading, router]);

  if (isLoading) return <Loader />;
  return (
    <>
      <Popup
        title="Success"
        message="Profile has been successfully updated!"
        buttonText="Go to profile"
        status="SUCCESS"
        isOpen={isSuccessPopupVisible}
        onClose={() => {
          setIsSuccessPopupVisible(false);
          router.push('/profile');
        }}
      />
      <Popup
        title="Error"
        message="Failed to update profile :("
        buttonText="Go to profile"
        status="ERROR"
        isOpen={isErrorPopupVisible}
        onClose={() => {
          setIsErrorPopupVisible(false);
          router.push('/profile');
        }}
      />
      <div>
        <h2>Edit profile</h2>
        <p>Change your profile settings</p>

        <div style={{ marginTop: 20 }}>
          <Input
            value={minValue}
            onChange={handleChangeMinValue}
            type="text"
            inputMode="decimal"
            placeholder="Min amount"
            label="Minimum donate amount (TON)"
          />
          <TonRate tonRate={tonRate * Number(minValue)} />
          <div style={{ marginTop: 20 }}>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your text"
              label="Text on the donation page"
            />
          </div>
          <span style={{ fontSize: 12, marginTop: 12 }}>
            Text will be displayed on the donation page
          </span>
        </div>
      </div>
    </>
  );
}