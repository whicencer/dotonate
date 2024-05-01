"use client";

import { Transaction } from "@/components/Transaction/Transaction";
import { Loader } from "@/components/ui/Loader/Loader";
import { useTonRate } from "@/hooks/useTonRate";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useBackButton, useInitDataRaw } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";

export default function Donations() {
  const initDataRaw = useInitDataRaw();
  // TODO: New hook for getting donations
  const { user, isLoading } = useUserProfile(initDataRaw);
  const [tonRate] = useTonRate();
  const backButton = useBackButton();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleBack = () => {
      window.history.back();
      backButton.hide();
    };
    backButton.show();
    backButton.on('click', handleBack);

    return () => backButton.off('click', handleBack);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div>
      <h1>Donations</h1>
      {
        user.donations.map((donation) => {
          return (
            <Transaction
              key={donation.id}
              createdAt={donation.createdAt}
              tonRate={tonRate}
              amount={donation.sum}
              message={donation.message}
              senderName={donation.senderName}
              />
          );
        })
      }
    </div>
  );
}