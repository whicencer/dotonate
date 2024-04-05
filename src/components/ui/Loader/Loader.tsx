import { RiCopperCoinLine } from "react-icons/ri";
import cls from "./styles.module.scss";

export function Loader() {
  return (
    <div className={cls.loader}>
      <RiCopperCoinLine size={200} className={cls.flicker} />
    </div>
  );
}