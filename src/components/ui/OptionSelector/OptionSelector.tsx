import { useState } from "react";
import cls from "./styles.module.scss";

interface Props {
  options: any[];
  // onSelect: (value: string) => void;
}

export const OptionSelector = ({ options }: Props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  return (
    <div className={cls.optionSelector}>
      {options.map((option, idx) => {
        return (
          <button key={idx} className={cls.optionSelectorButton}>{option}</button>
        );
      })}
    </div>
  );
}