import cls from "./styles.module.scss";

interface TextareaProps {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	label?: string;
  secondary?: boolean;
}

export function Textarea({ value, onChange, placeholder, label, secondary }: TextareaProps) {
  return (
    <div className={cls.textareaWrapper}>
      {label && <label className={secondary ? cls.secondaryLabel : ""}>{label}</label>}
      <textarea
        className={cls.textarea + (secondary ? " " + cls.secondary : "")}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}