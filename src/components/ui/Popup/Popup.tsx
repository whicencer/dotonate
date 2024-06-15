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
  onClose: () => void;
}

export const Popup = ({ status, title, message, buttonText, onClose, isOpen }: Props) => {
  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`${cls.popupWrapper} ${isOpen ? cls.open : ''}`} onClick={handleClose}>
      <div className={`${cls.popup} ${isOpen ? cls.open : ''}`}>
        {status === "SUCCESS" ? <GrStatusGood size={90} /> : <MdError size={90} />}
        <div className={cls.popupMessage}>
          <h3>{title}</h3>
          <p>{message}</p>
        </div>
        <Button style={{borderRadius: 10, marginTop: 24}} onClick={onClose}>{buttonText}</Button>
      </div>
    </div>
  );
}