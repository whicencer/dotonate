import { CSSProperties, ReactNode } from "react";
import cls from "./styles.module.scss";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}

export const Button = ({ children, onClick, style }: Props) => {
  return (
    <button style={style} className={cls.button} onClick={onClick}>
      { children }
    </button>
  );
};