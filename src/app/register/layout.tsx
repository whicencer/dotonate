import { RegistrationProvider } from "./context/RegistrationContext";
import cls from "./register.module.scss";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <RegistrationProvider>
      <div className={cls.registerWrapper}>
        {children}
      </div>
    </RegistrationProvider>
  );
}