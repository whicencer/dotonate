import { toNano } from "@ton/ton";
import { useTonConnectUI } from "@tonconnect/ui-react";

export const useTransaction = () => {
  const [tonConnectUI] = useTonConnectUI();

  const createTransaction = async (recepientAddress: string, amount: number) => {
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: recepientAddress,
          amount: toNano(amount).toString(),
        }
      ]
    }, {
      notifications: ['before', 'success', 'error']
    });
  };

  return { createTransaction };
};