"use client";

import { useThemeParams } from "@tma.js/sdk-react";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { ReactNode } from "react";

export const TonConnectProvider = ({ children }: { children: ReactNode }) => {
  const {isDark} = useThemeParams();

  // TODO: Manifest
  return (
    <TonConnectUIProvider
      manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json"
      uiPreferences={{
        theme: isDark ? THEME.DARK : THEME.LIGHT
      }}
    >
      {children}
    </TonConnectUIProvider>
  );
};