"use client";

import { ReactNode } from "react";
import { TmaSDKLoader } from "../TmaSDKLoader";
import { TonConnectProvider } from "./TonConnectProvider";
import { AppRoot } from '@telegram-apps/telegram-ui';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TmaSDKLoader>
      <TonConnectProvider>
        <AppRoot>
          {children}
        </AppRoot>
      </TonConnectProvider>
    </TmaSDKLoader>
  );
};
