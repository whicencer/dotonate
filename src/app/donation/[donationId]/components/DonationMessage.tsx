import { Panel } from "@/components/ui/Panel/Panel";
import cls from "../styles.module.scss";

interface Props {
  message: string;
}

export const DonationMessage = ({ message }: Props) => {
  return (
    <div className={cls.donationMessage}>
      <Panel>
        <span>Donation message</span>
        <p>{message}</p>
      </Panel>
    </div>
  )
};