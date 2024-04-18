import cls from "./input.module.scss";

interface InputProps {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	type?: string;
	placeholder?: string;
	invalid?: boolean;
	label?: string;
	min?: number;
	max?: number;
	lang?: string;
	inputMode?: "text" | "search" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
	secondary?: boolean;
	style?: React.CSSProperties;
}

const ignoreArrowKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (['ArrowUp', 'ArrowDown'].indexOf(event.key) > -1) {
    event.preventDefault();
  }
}

export const Input = ({ type = "text", lang="en", placeholder, value, onChange, invalid, label, checked, inputMode, min, max, secondary, style }: InputProps) => {
	return (
		<div className={cls.inputWrapper} style={style}>
			{label && <label className={secondary ? cls.secondaryLabel : ""}>{label}</label>}
			<input
				lang={lang}
				checked={checked}
				inputMode={inputMode}
				value={value}
				onChange={onChange}
				className={cls.input + (invalid ? " " + cls.invalid : "") + (secondary ? " " + cls.secondary : "")}
				type={type}
				placeholder={placeholder}
				min={min}
				max={max}
				onKeyDown={ignoreArrowKeys}
			/>
		</div>
	);
};