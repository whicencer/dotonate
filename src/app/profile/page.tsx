"use client";

import { Card } from "@/components/Card/Card";
import { Loader } from "@/components/ui/Loader/Loader";
import { User } from "@/types/User";
import { useInitDataRaw } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";
import cls from "./styles.module.scss";
import { Transaction } from "@/components/Transaction/Transaction";
import { DonationLink } from "@/components/DonationLink/DonationLink";
import Link from "next/link";
import { HiPencil } from "react-icons/hi";

import { useUserProfile } from "@/hooks/useUserProfile";

export default function Profile() {
  const initDataRaw = useInitDataRaw();
  const {user, isLoading} = useUserProfile(initDataRaw);

  if (isLoading) return <Loader />
  return (
    <div>
      <div className={cls.header}>
        <h2 className={cls.greeting}>Hello, @{user.username}</h2>
        <Link href="/profile/edit">
          <HiPencil size={24} style={{ paddingBottom: 3 }} />
        </Link>
      </div>
      <Card />

      <div className={cls.donations}>
        <h2>
          Donations
          <span>
            (<Link href="/profile/donations">See all</Link>)
          </span>
        </h2>
        <DonationLink username={user.username} />
        <Transaction />
        <Transaction />
      </div>
    </div>
  );
}