"use client";

import cls from "./styles.module.scss";

interface Props {
  tonRate: number
}

export const TonRate = ({ tonRate }: Props) => {
  const tonRateFixed = tonRate.toFixed(2);

  return (
    <span className={cls.tonRate}>(~ ${tonRateFixed})</span>
  );
};
