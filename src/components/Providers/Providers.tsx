"use client";

import { ReactNode } from "react";
import { TmaSDKLoader } from "../TmaSDKLoader";
import { TonConnectProvider } from "./TonConnectProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TmaSDKLoader>
      <TonConnectProvider>
        {children}
      </TonConnectProvider>
    </TmaSDKLoader>
  );
};
