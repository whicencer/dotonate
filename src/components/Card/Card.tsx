'use client';

import { useState } from 'react';
import cls from './styles.module.scss';
import { Donation } from '@/types/Donation';
import { IncomeStatuses } from '@/enums/IncomeStatuses';
import { calculateIncome } from '@/helpers/calculateIncome';

interface Props {
  donations: Donation[];
  tonRate: number;
}

export function Card({ donations, tonRate }: Props) {
  const [currentIncomeStatus, setCurrentIncomeStatus] = useState<IncomeStatuses>(IncomeStatuses.all);
  const income = calculateIncome(donations, currentIncomeStatus);

  return (
    <div className={cls.card}>
      <div className={cls.cardContent}>
        <span>Your total income</span>
        <h2>{Number(income.toFixed(2)).toLocaleString("en-US")} TON</h2>
        <span>≈ ${(income * tonRate).toLocaleString('en-US')}</span>
      </div>

      <div className={cls.badges}>
        {['all', 'year', 'month', 'day'].map((status) => (
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
    </div>
  );
}
