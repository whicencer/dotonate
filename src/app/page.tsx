"use client";

import { useEffect } from 'react';
import { useInitDataRaw, useViewport } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";
import { ResponseAuthData } from "./types";
import { Loader } from '@/components/ui/Loader/Loader';

export default function Home() {
  const initDataRaw = useInitDataRaw();
  const router = useRouter();
  const viewport = useViewport();

  useEffect(() => {
    viewport.expand();
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
        if (data.data.userExists) {
          router.push("/profile");
        } else {
          router.push("/welcome");
        }
      } catch (error) {
        console.error('Ошибка валидации', error);
      }
    };

    if (initDataRaw) {
      validateInitData();
    }
  }, [initDataRaw, router, viewport]);

  return <Loader />;
}