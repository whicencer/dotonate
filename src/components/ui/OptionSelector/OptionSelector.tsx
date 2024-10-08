import { useState } from "react";
import cls from "./styles.module.scss";

interface Props {
  options: { label: string; value: string }[];
  selectedOption: string;
  onSelect?: (value: string) => void;
}

export const OptionSelector = ({ options, onSelect, selectedOption }: Props) => {

  const handleSelect = (option: string) => {
    if (onSelect) {
      onSelect(option);
    }
  };
  
  return (
    <div className={cls.optionSelector}>
      {options.map((option, idx) => {
        return (
          <button
            key={idx}
            className={cls.optionSelectorButton + (selectedOption === option.value ? " " + cls.selected : "")}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}