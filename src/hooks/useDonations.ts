import { useInitDataRaw } from "@tma.js/sdk-react";
import { useUserProfile } from "./useUserProfile";

export const useDonations = () => {
  const initDataRaw = useInitDataRaw();
  const { user, isLoading } = useUserProfile(initDataRaw);

  return { donations: user.donations, isLoading };
};