import { useState } from "react";
import cls from "./styles.module.scss";

interface Props {
  username: string;
  copiedColor?: string;
}

export function DonationLink({ username, copiedColor }: Props) {
  const TelegramBot = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "";
  const TelegramApp = process.env.NEXT_PUBLIC_TELEGRAM_BOT_APP || "";

  const [donationLink] = useState(`https://t.me/${TelegramBot}/${TelegramApp}?startapp=${username}`);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Hey! ✨ Spread some joy and show your support!
🥳 Your donation can make a big difference
Dotonate Me 🙌💛
${donationLink}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <>
      <div className={cls.donationLink}>
        <h3>Your donation link</h3>
        <button
          onClick={handleCopy}
          style={{ color: isCopied ? copiedColor || 'var(--tg-theme-accent-text-color)' : '' }}
        >
          {isCopied ? "Copied to clipboard!" : "(click to copy)"}
        </button>
      </div>
    </>
  );
}
