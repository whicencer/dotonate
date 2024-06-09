import { BoobaLoader } from "@/components/ui/Loader/BoobaLoader";
import { DonationTypes } from "@/types/Donation";
import Image from "next/image";

export const config = {
  [DonationTypes.BOOBA]: {
    loader: <BoobaLoader />,
    mainColor: "#EB00FF",
    icon: <Image src={"/booba.png"} width={28} height={34} alt="booba" />,
  },
};