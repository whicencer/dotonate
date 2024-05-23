import { Textarea } from '@/components/ui/Textarea/Textarea';
import cls from '../styles.module.scss';

interface Props {
  message: string;
  setMessage: (message: string) => void;
}

export const DonationAnswer = ({ message, setMessage }: Props) => {
  return (
    <div className={cls.answer}>
      <span>Your answer</span>
      <Textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Enter your answer here..."
      />
    </div>
  )
};