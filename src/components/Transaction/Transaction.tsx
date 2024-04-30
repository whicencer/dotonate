import { TonRate } from '../TonRate/TonRate';
import cls from './styles.module.scss';

interface Props {
  createdAt: Date;
  senderName: string;
  amount: number;
  message: string;
  tonRate: number;
}

export function Transaction({ senderName, amount, message, tonRate, createdAt }: Props) {
  const tonToUsd = tonRate * amount;
  const creationDate = new Date(createdAt);

  return (
    <div className={cls.Transaction}>
      <div className={cls.header}>
        <h2 className={cls.donator}>{senderName}</h2>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", width: "100%" }}>
          <h4 className={cls.transactionSum}>{amount} TON</h4>
          <TonRate tonRate={tonToUsd} />
        </div>
      </div>
      <p className={cls.donationMsg}>{message}</p>
      <div className={cls.menu}>
        <span className={cls.menuBtn}>Answer</span>
        <span className={cls.creationDate}>{creationDate.getDate() + "/" + (creationDate.getMonth() + 1) + "/" + creationDate.getFullYear()}</span>
      </div>
    </div>
  );
}
