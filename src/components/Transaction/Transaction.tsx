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
  const creationDate = new Date(donation.createdAt);

  return (
    <div className={cls.Transaction}>
      <div className={cls.header}>
        <h2 className={cls.donator}>{donation.senderName}</h2>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", width: "100%" }}>
          <h4 className={cls.transactionSum}>{donation.sum} TON</h4>
          <TonRate tonRate={tonToUsd} />
        </div>
      </div>
      <p className={cls.donationMsg}>{donation.message}</p>
      <div className={cls.menu}>
        <Link href={`/donation/${donation.id}`} className={cls.menuBtn}>Answer</Link>
        <span className={cls.creationDate}>{creationDate.getDate() + "/" + (creationDate.getMonth() + 1) + "/" + creationDate.getFullYear()}</span>
      </div>
    </div>
  );
}
