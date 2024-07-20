"use client";

import { ReactNode } from "react";
import { TmaSDKLoader } from "../TmaSDKLoader";
import { TonConnectProvider } from "./TonConnectProvider";
import { TelegramUIProvider } from "./TelegramUIProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TmaSDKLoader>
      <TonConnectProvider>
        <TelegramUIProvider>
          {children}
        </TelegramUIProvider>
      </TonConnectProvider>
    </TmaSDKLoader>
  );
};
