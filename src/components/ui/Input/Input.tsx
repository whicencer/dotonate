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
	inputMode?: "text" | "search" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
}

export const Input = ({ type = "text", placeholder, value, onChange, invalid, label, checked, inputMode, min, max }: InputProps) => {
	return (
		<div className={cls.inputWrapper}>
			{label && <label>{label}</label>}
			<input
				checked={checked}
				inputMode={inputMode}
				value={value}
				onChange={onChange}
				className={cls.input + (invalid ? " " + cls.invalid : "")}
				type={type}
				placeholder={placeholder}
				min={min}
				max={max}
			/>
		</div>
	);
};