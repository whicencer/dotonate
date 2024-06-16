import { GrStatusGood } from "react-icons/gr";
import { MdError } from "react-icons/md";
import { Button } from "../Button/Button";
import cls from "./styles.module.scss";

interface Props {
  status: "SUCCESS" | "ERROR";
  title: string;
  message: string;
  buttonText: string;

  isOpen: boolean;
  onButtonClick?: () => void;
}

export const Popup = ({ status, title, message, buttonText, isOpen, onButtonClick }: Props) => {
  return (
    <div className={`${cls.popupWrapper} ${isOpen ? cls.open : ''}`}>
      <div className={`${cls.popup} ${isOpen ? cls.open : ''}`}>
        {status === "SUCCESS" ? <GrStatusGood size={90} /> : <MdError size={90} />}
        <div className={cls.popupMessage}>
          <h3>{title}</h3>
          <p>{message}</p>
        </div>
        <Button style={{borderRadius: 10, marginTop: 24}} onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </div>
  );
}