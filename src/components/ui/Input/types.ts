export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	invalid?: boolean;
	label?: string;
	secondary?: boolean;
}