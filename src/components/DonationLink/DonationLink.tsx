import { useState } from "react";
import cls from "./styles.module.scss";

interface Props {
  username: string;
}

export function DonationLink({ username }: Props) {
  const TelegramBot = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "";
  const TelegramApp = process.env.NEXT_PUBLIC_TELEGRAM_BOT_APP || "";

  const [donationLink] = useState(`https://t.me/${TelegramBot}/${TelegramApp}?startapp=${username}`);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(donationLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <>
      <div className={cls.donationLink}>
        <h3>Your donation link</h3>
        <span onClick={handleCopy} className={isCopied ? cls.copied : ""}>
          {isCopied ? "Copied to clipboard!" : "(click to copy)"}
        </span>
      </div>
    </>
  );
}
