"use client";

import { Card } from "@/components/Card/Card";
import { Loader } from "@/components/ui/Loader/Loader";
import { useInitDataRaw } from "@tma.js/sdk-react";
import cls from "./styles.module.scss";
import { Transaction } from "@/components/Transaction/Transaction";
import { DonationLink } from "@/components/DonationLink/DonationLink";
import Link from "next/link";
import { HiPencil } from "react-icons/hi";

import { useUserProfile } from "@/hooks/useUserProfile";
import { useTonRate } from "@/hooks/useTonRate";
import { NoDonations } from "./components/NoDonations";
import { Donation, DonationTypes } from "@/types/Donation";

export default function Profile() {
  const initDataRaw = useInitDataRaw();
  const { user, isLoading } = useUserProfile(initDataRaw);
  const [tonRate] = useTonRate();

  if (isLoading) return <Loader />;
  return (
    <div>
      <div className={cls.header}>
        <h2 className={cls.greeting}>Hello, @{user.username}</h2>
        <Link href="/profile/edit">
          <HiPencil size={24} style={{ paddingBottom: 3 }} />
        </Link>
      </div>
      <Card tonRate={tonRate} donations={user.donations} currency={DonationTypes.TON} />

      <div className={cls.donations}>
        <h2>
          Donations
          <span>
            (<Link href="/profile/donations">See all</Link>)
          </span>
        </h2>
        <DonationLink username={user.username} />
      </div>

      <div className={cls.transactions}>
        {
          user.donations.length
            ? <DonationList donations={user.donations} tonRate={tonRate} />
            : <NoDonations />
        }
      </div>
      <Link href={`/profile/${DonationTypes.BOOBA}`}>go booba</Link>
    </div>
  );
}

function DonationList({ donations, tonRate }: { donations: Donation[], tonRate: number }) {
  return (
    <div>
      {
        donations.map((donation, index) => {
          if (index < 3) {
            return (
              <Transaction
                key={donation.id}
                donation={donation}
                tonRate={tonRate}
              />
            );
          }
        })
      }
    </div>
  );
}