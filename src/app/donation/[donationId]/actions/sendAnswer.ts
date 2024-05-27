"use server";

import prisma from "@/lib/prisma";
import TelegramService from "@/services/telegramService";

const telegramService = new TelegramService();

export async function sendAnswer(answerMsg: string, donationId: number, username: string, donatorId: number) {
  try {
    await telegramService.sendMessage(
      donatorId,
      `💬 Answer from <b>${username}</b> on your Donation:\n\n${answerMsg}`
    );

    await prisma.donate.update({
      where: {
        id: donationId
      },
      data: {
        answered: true
      }
    });
  } catch (error: any) {
    console.log(`Failed to send answer: ${error.message}`);
    throw new Error(`Failed to send answer: ${error.message}`);
  }
}