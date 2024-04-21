"use client";

import React, { useEffect, useState } from 'react';
import { Response } from './types';

interface Props {
  tipAmount: number
}

export const TonRate = ({ tipAmount }: Props) => {
  const [tonRate, setTonRate] = useState<Response>({} as Response);

  useEffect(() => {
    const getTonRate = async () => {
      const response = await fetch("https://tonapi.io/v2/rates?tokens=ton&currencies=ton,usd");
      const data: Response = await response.json();
      setTonRate(data);
    };

    getTonRate();
  }, [])

  if (!tonRate) return "Loading...";

  return (
    <div>(~ ${(tonRate?.rates?.TON?.prices?.USD * tipAmount).toFixed(2)})</div>
  );
};
