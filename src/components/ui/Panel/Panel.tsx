import cls from "./styles.module.scss";

export const Panel = ({ children }: { children: React.ReactNode }) => {
  return <div className={cls.panel}>{children}</div>;
}