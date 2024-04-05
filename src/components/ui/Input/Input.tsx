import cls from "./input.module.scss";

interface InputProps {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	type?: string;
	placeholder?: string;
	invalid?: boolean;
	label?: string;
}

export const Input = ({ type = "text", placeholder, value, onChange, invalid, label, checked }: InputProps) => {
	return (
		<div className={cls.inputWrapper}>
			{label && <label>{label}</label>}
			<input
				checked={checked}
				value={value}
				onChange={onChange}
				className={cls.input + (invalid ? " " + cls.invalid : "")}
				type={type}
				placeholder={placeholder}
			/>
		</div>
	);
};