"use client";

import { Transaction } from "@/components/Transaction/Transaction";
import { Loader } from "@/components/ui/Loader/Loader";
import { useDonations } from "@/hooks/useDonations";
import { useTonRate } from "@/hooks/useTonRate";
import { useBackButton, } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { IoReload } from "react-icons/io5";
import cls from "./styles.module.scss";

export default function Donations() {
  const { donations, isLoading } = useDonations();
  const [tonRate] = useTonRate();
  const backButton = useBackButton();

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
      <div className={cls.header}>
        <h1>Donations</h1>
        <button className={cls.reload} onClick={() => window.location.reload()}>
          <IoReload size={25} />
        </button>
      </div>
      {
        donations.map((donation) => {
          return (
            <Transaction
              key={donation.id}
              donation={donation}
              tonRate={tonRate}
            />
          );
        })
      }
    </div>
  );
}