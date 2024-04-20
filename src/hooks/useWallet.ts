import { Network, getHttpEndpoint } from "@orbs-network/ton-access";
import { Address, TonClient, fromNano } from "@ton/ton";
import { useTonWallet } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

export const useWallet = () => {
  const tonWallet = useTonWallet();
  const [balance, setBalance] = useState(0);
  const network = process.env.NEXT_PUBLIC_TON_NETWORK as Network;
  
  useEffect(() => {
    async function getBalance() {
      const endpoint = await getHttpEndpoint({ network: network || "mainnet" });
      const client = new TonClient({ endpoint });

      if (tonWallet) {
        const balance = await client.getBalance(Address.parse(tonWallet.account.address));
        const numberedBalance = Number(fromNano(balance)).toFixed(2);
        setBalance(Number(numberedBalance));
      }
    }

    getBalance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tonWallet]);

  return { isAuth: !!tonWallet, balance, tonWallet };
};