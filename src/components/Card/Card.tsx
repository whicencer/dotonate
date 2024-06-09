'use client';

import { ReactElement, useState } from 'react';
import cls from './styles.module.scss';
import { Donation, DonationTypes } from '@/types/Donation';
import { IncomeStatuses } from '@/enums/IncomeStatuses';
import { calculateIncome } from '@/helpers/calculateIncome';
import Image from 'next/image';

interface Props {
  donations: Donation[];
  tonRate?: number;
  currency: DonationTypes;
  color?: string;
  icon?: ReactElement;
}

export function Card({ donations, tonRate = 0, currency, color, icon }: Props) {
  const [currentIncomeStatus, setCurrentIncomeStatus] = useState<IncomeStatuses>(IncomeStatuses.all);
  const income = calculateIncome(donations, currentIncomeStatus);

  return (
    <div className={cls.card} style={{ background: color }}>
      <div className={cls.cardContent}>
        <span>Your total income</span>
        <h2>{Number(income.toFixed(3)).toLocaleString("en-US")} {currency.toUpperCase()}</h2>
        <span>≈ ${(income * tonRate).toLocaleString('en-US')}</span>
      </div>

      <div className={cls.badges}>
        {['all', 'year', 'month', 'week'].map((status) => (
          <span
            key={status}
            onClick={() => setCurrentIncomeStatus(status as IncomeStatuses)}
            className={`${cls.badge} ${
              currentIncomeStatus === status ? cls.badgeActive : ''
            }`}
          >
            {status === 'all' ? 'All time' : `Last ${status}`}
          </span>
        ))}
      </div>

      { icon ? icon : null }
    </div>
  );
}
