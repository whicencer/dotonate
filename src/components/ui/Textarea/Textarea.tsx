import cls from "./styles.module.scss";

interface TextareaProps {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	label?: string;
}

export function Textarea({ value, onChange, placeholder, label }: TextareaProps) {
  return (
    <div className={cls.textareaWrapper}>
      {label && <label>{label}</label>}
      <textarea
        className={cls.textarea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}