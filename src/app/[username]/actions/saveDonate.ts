"use server";

import prisma from "@/lib/prisma";

interface Donation {
  senderName: string;
  senderWalletAddress: string;
  senderTelegramId: number;

  recipientId: string;
  recipientUsername: string;
  recipientWalletAddress: string;

  tipAmount: number;
  message: string;
}

export async function saveDonate(donation: Donation) {
  try {
    await prisma.donate.create({
      data: {
        senderName: donation.senderName,
        message: donation.message,
        sum: donation.tipAmount,
        senderAddress: donation.senderWalletAddress,
        senderTelegramId: donation.senderTelegramId,
        recipientId: donation.recipientId,
        recipientUsername: donation.recipientUsername,
        recipientAddress: donation.recipientWalletAddress,
      },
      include: {
        recipient: true
      }
    });
  } catch (error: any) {
    console.log(`Failed to send donation: ${error.message}`);
    throw new Error(`Failed to send donation: ${error.message}`);
  }
}