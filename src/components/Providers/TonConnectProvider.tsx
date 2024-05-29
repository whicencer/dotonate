"use client";

import { useThemeParams } from "@tma.js/sdk-react";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { ReactNode } from "react";

export const TonConnectProvider = ({ children }: { children: ReactNode }) => {
  const {isDark} = useThemeParams();

  return (
    <TonConnectUIProvider
      manifestUrl="/tonconnect-manifest.json"
      uiPreferences={{
        theme: isDark ? THEME.DARK : THEME.LIGHT
      }}
    >
      {children}
    </TonConnectUIProvider>
  );
};