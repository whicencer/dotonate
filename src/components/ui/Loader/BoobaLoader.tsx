import Image from "next/image";
import cls from "./styles.module.scss";

export const BoobaLoader = () => {
  return (
    <div className={cls.loader}>
      <h1 className={cls.flicker}>$BOOBA</h1>
    </div>
  );
}