import cls from "./styles.module.scss";

interface Props {
  currentValue: number;
  targetValue: number;
}

export const ProgressBar = ({ currentValue, targetValue }: Props) => {
  const percentage = (((currentValue - 0) / (targetValue - 0)) * 100).toFixed(1);

  return (
    <>
      <div className={cls.progressBarContainer}>
        <div className={cls.progressBar} style={{ width: `${percentage}%`, color: Number(percentage) < 14 ? "#000" : "#fff" }}>{percentage}%</div>
      </div>
      <div className={cls.progressValue}>
        <span className={cls.currentValue}>{currentValue} TON</span>
        <span className={cls.targetValue}>{targetValue} TON</span>
      </div>
    </>
  );
}