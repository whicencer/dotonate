"use client";

import { Input } from "@/components/ui/Input/Input";
import { Loader } from "@/components/ui/Loader/Loader";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useBackButton, useInitDataRaw, useMainButton } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { editUser } from "./services/editUser";

export default function EditProfile() {
  const initDataRaw = useInitDataRaw();
  const { user, isLoading } = useUserProfile(initDataRaw);

  const [minValue, setMinValue] = useState(1);
  const [pageText, setPageText] = useState("");
  
  const router = useRouter();
  const backButton = useBackButton();
  const mainButton = useMainButton();

  useEffect(() => {
    if (user) {
      setMinValue(user.minDonate || 1);
      setPageText(user.description || "");
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      mainButton.show();
      mainButton.setText("Save");
      mainButton.enable();
    }

    const handlerClick = async () => {
      mainButton.hide();
      try {
        const response = await editUser(minValue, pageText, initDataRaw);
        
        if (response.ok) {
          alert("Profile has been successfully updated!");
          router.push('/profile');
          backButton.hide();
        } else {
          alert("Failed to update profile :(");
          console.error("Failed to update profile");
          mainButton.show();
        }
      } catch (error) {
        console.log("Error while updating profile: ", error);
      }
    };

    mainButton.on('click', handlerClick);

    return () => mainButton.off('click', handlerClick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minValue, pageText, initDataRaw, isLoading, router]);

  useEffect(() => {
    backButton.show();
    backButton.on('click', () => {
      router.back();
      backButton.hide();
      mainButton.hide();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, mainButton]);

  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>Edit profile</h2>
      <p>Change your profile settings</p>

      <div style={{ marginTop: 20 }}>
        <Input
          min={1}
          value={minValue.toString()}
          onChange={(e) => setMinValue(Number(e.target.value))}
          type="number"
          inputMode="numeric"
          placeholder="Min amount"
          label="Minimum donate amount"
        />
        <div style={{ marginTop: 20 }}>
          <Textarea
            value={pageText}
            onChange={(e) => setPageText(e.target.value)}
            placeholder="Your text"
            label="Text on the donation page"
          />
        </div>
        <span style={{ fontSize: 12, marginTop: 12 }}>
          Text will be displayed on the donation page
        </span>
      </div>
    </div>
  );
}