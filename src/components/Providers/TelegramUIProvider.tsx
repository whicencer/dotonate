"use client";

import { useThemeParams } from "@tma.js/sdk-react";
import { AppRoot } from '@telegram-apps/telegram-ui';
import React from "react";

export const TelegramUIProvider = ({ children }: { children: React.ReactNode }) => {
  const {isDark} = useThemeParams();

  return (
    <AppRoot appearance={isDark ? 'dark' : 'light'}>
      {children}
    </AppRoot>
  );
};