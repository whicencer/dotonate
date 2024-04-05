'use client';

import { useState } from 'react';
import cls from './styles.module.scss';

enum IncomeStatuses {
  all = 'all',
  year = 'year',
  month = 'month',
}

// Utility function for formatting currency
const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'TON' });
};

export function Card() {
  const incomes = {
    all: "2451.42",
    year: "741.65",
    month: "127.83",
  };

  const [currentIncomeStatus, setCurrentIncomeStatus] =
    useState<IncomeStatuses>(IncomeStatuses.all);

  // Get current income based on the selected status
  const currentIncome = formatCurrency(
    parseFloat(incomes[currentIncomeStatus])
  );
  const currentIncomeNumber = parseFloat(incomes[currentIncomeStatus]);

  return (
    <div className={cls.card}>
      <div className={cls.cardContent}>
        <span>Your total income</span>
        <h2>{currentIncome}</h2>
        <span>≈ ${currentIncomeNumber * 5}</span>
      </div>

      <div className={cls.badges}>
        {['all', 'year', 'month'].map((status) => (
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
