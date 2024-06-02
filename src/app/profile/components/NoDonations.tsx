import { PiHandCoinsThin } from "react-icons/pi";
import cls from "./styles.module.scss";

export const NoDonations = () => {
  return (
    <div className={cls.noDonations}>
      <PiHandCoinsThin size={140} />
      <h3>You have no donations yet</h3>
    </div>
  )
}