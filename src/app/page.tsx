"use client";

import { useEffect } from 'react';
import { useInitData, useInitDataRaw, useViewport } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";
import { ResponseAuthData } from "./types";
import { Loader } from '@/components/ui/Loader/Loader';

export default function Home() {
  const initDataRaw = useInitDataRaw();
  const initData = useInitData();
  const router = useRouter();
  const viewport = useViewport();

  useEffect(() => {
    if (!initDataRaw) return;

    const validateInitData = async () => {
      try {
        const response = await fetch("/api/validate", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `tma ${initDataRaw}`
          },
        });
        
        if (!response.ok) {
          throw new Error('Ошибка запроса к серверу');
        }
        
        const data: ResponseAuthData = await response.json();
        
        if (initData?.startParam) {
          router.push(`/${initData.startParam}`);
        } else if (data.data.userExists) {
          router.push("/profile");
        } else {
          router.push("/welcome");
        }
      } catch (error) {
        console.error('Ошибка валидации', error);
      }
    };
    
    validateInitData();
    viewport.expand();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initDataRaw]);

  return <Loader />;
}