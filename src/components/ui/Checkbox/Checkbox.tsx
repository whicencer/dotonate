import cls from "./checkbox.module.scss";

interface CheckboxProps {
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ checked, onChange }: CheckboxProps) => {
	return (
		<label className={cls.customCheckbox}>
			<input type="checkbox" id="myCheckbox" checked={checked} onChange={onChange} />
			<span className={cls.checkmark}></span>
		</label>
	);
};