import cls from "./input.module.scss";
import { InputProps } from "./types";

const ignoreArrowKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (['ArrowUp', 'ArrowDown'].indexOf(event.key) > -1) {
    event.preventDefault();
  }
};

// eslint-disable-next-line react/display-name
export const Input = (props: InputProps) => {
	return (
		<div className={cls.inputWrapper} style={props.style}>
			{props.label && <label className={props.secondary ? cls.secondaryLabel : ""}>{props.label}</label>}
			<input
				{ ...props }
				className={cls.input + (props.invalid ? " " + cls.invalid : "") + (props.secondary ? " " + cls.secondary : "")}
				onKeyDown={ignoreArrowKeys}
			/>
		</div>
	);
};