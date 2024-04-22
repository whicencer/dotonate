import { useEffect, useState } from "react";

export const useTonRate = (currency: string = "usd") => {
  const [tonRate, setTonRate] = useState(0);

  useEffect(() => {
    const getTonRate = async () => {
      const response = await fetch(`https://tonapi.io/v2/rates?tokens=ton&currencies=ton,${currency}`);
      const data = await response.json();

      setTonRate(data?.rates?.TON?.prices[currency.toUpperCase()]);
    };

    getTonRate();
  }, [currency]);

  return tonRate;
}