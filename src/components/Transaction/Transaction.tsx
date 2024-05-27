import Link from 'next/link';
import { TonRate } from '../TonRate/TonRate';
import cls from './styles.module.scss';
import { Donation } from '@/types/Donation';

interface Props {
  donation: Donation;
  tonRate: number;
}

export function Transaction({ donation, tonRate }: Props) {
  const tonToUsd = tonRate * donation.sum;

  return (
    <Link href={`/donation/${donation.id}`} className={cls.link}>
      <div className={cls.Transaction}>
        <div className={cls.header}>
          <h2 className={cls.donator}>{donation.senderName}</h2>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", width: "100%" }}>
            <h4 className={cls.transactionSum}>{donation.sum} TON</h4>
            <TonRate tonRate={tonToUsd} />
          </div>
        </div>
        <p className={cls.donationMsg}>{donation.message}</p>
      </div>
    </Link>
  );
}
