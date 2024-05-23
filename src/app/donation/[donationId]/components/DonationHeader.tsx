import { User } from '@/components/icons/User/User';
import cls from '../styles.module.scss';

interface Props {
  senderName: string;
}

export const DonationHeader = ({ senderName }: Props) => {
  return (
    <div className={cls.header}>
      <User />
      <span>Dotonate from <strong>{senderName}</strong></span>
    </div>
  );
};