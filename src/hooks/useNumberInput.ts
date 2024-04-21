import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type ReturnType = [string, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<string>>];

export const useNumberInput = (defaultValue = "0"): ReturnType => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let amount = e.target.value.replace(",", ".");

    if (/^\d*(\.\d{0,4})?$/.test(amount)) {
      setValue(amount);
    }
  };

  return [value, handleChange, setValue];
};