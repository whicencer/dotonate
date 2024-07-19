import { useCallback, useEffect, useState } from "react";

export const useTonRate = (currency: string = "usd"): [number] => {
  const [tonRate, setTonRate] = useState(0);

  const getTonRate = useCallback(async () => {
    try {
      const response = await fetch(`https://tonapi.io/v2/rates?tokens=ton&currencies=ton,${currency}`);
      const data = await response.json();
      setTonRate(data?.rates?.TON?.prices[currency.toUpperCase()]);
    } catch (error) {
      console.log("Error while getting ton rate: ", error);
    }
  }, [currency]);

  useEffect(() => {
    getTonRate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [Number(tonRate.toFixed(2))];
}