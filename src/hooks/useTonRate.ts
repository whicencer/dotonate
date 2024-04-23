import { useEffect, useState } from "react";

export const useTonRate = (currency: string = "usd"): [number, boolean] => {
  const [tonRate, setTonRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const getTonRate = async () => {
        const response = await fetch(`https://tonapi.io/v2/rates?tokens=ton&currencies=ton,${currency}`);
        const data = await response.json();
  
        setTonRate(data?.rates?.TON?.prices[currency.toUpperCase()]);
      };
  
      getTonRate();
    } catch (error) {
      console.log("Error while getting ton rate: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [currency]);

  return [tonRate, isLoading];
}