"use client";

import { useInitDataRaw } from "@tma.js/sdk-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { config } from "../config/config";
import { DonationTypes } from "@/types/Donation";
import { Card } from "@/components/Card/Card";
import { DonationLink } from "@/components/DonationLink/DonationLink";
import Link from "next/link";
import { HiPencil } from "react-icons/hi";
import cls from "../styles.module.scss";

interface DonationPageProps {
  params: { currency: string }
}

export default function ProfileCurrency({ params }: DonationPageProps) {
  const initDataRaw = useInitDataRaw();
  const { user, isLoading } = useUserProfile(initDataRaw);
  const currencyKey = params.currency as keyof typeof config;
  const currencyConfig = config[currencyKey];

  if (isLoading) return currencyConfig.loader;
  return (
    <div>
      <div className={cls.header}>
        <h2 className={cls.greeting}>Hello, @{user.username}</h2>
        <Link href="/profile/edit">
          <HiPencil size={24} style={{ paddingBottom: 3 }} />
        </Link>
      </div>
      <Card
        donations={[]}
        currency={currencyKey as DonationTypes}
        color={currencyConfig.mainColor}
        icon={currencyConfig.icon}
      />

      <div className={cls.donations}>
        <h2>
          Donations
          {/* <span>
            (<Link href="/profile/donations">See all</Link>)
          </span> */}
        </h2>
        <DonationLink username={user.username + '&currency=' + currencyKey} copiedColor={currencyConfig.mainColor} />
      </div>
    </div>
  );
}