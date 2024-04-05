import { useState } from "react";
import cls from "./styles.module.scss";

export function DonationLink() {
  const [donationLink] = useState("https://t.me/dotonatebot/app/9123415");
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
