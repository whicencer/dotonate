"use server";

import prisma from "@/lib/prisma";

export async function getDonateById(donationId: number) {
  try {
    const donate = await prisma.donate.findUnique({
      where: {
        id: donationId
      },
      include: {
        recipient: true
      }
    });


    // TODO: Fix govnocode
    const donationSerialized = {
      ...donate,
      recipient: {
        ...donate?.recipient,
        telegramId: Number(donate?.recipient?.telegramId)
      },
      senderTelegramId: Number(donate?.senderTelegramId)
    };

    return JSON.parse(JSON.stringify(donationSerialized));
  } catch (error: any) {
    console.log(`Failed to get donation: ${error.message}`);
    throw new Error(`Failed to get donation: ${error.message}`);
  }
}