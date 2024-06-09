import { User } from "./User";

export enum DonationTypes {
  TON = "ton",
  BOOBA = "booba",
}

export interface Donation {
  id: number;
  senderName: string;
  senderAddress: string;
  senderTelegramId: number;
  recipient: User;
  recipientId: string;
  recipientUsername: string;
  recipientAddress: string;
  sum: number;
  message: string;
  answered: boolean;
  createdAt: Date;
}