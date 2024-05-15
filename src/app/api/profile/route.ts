import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/app/api/services/authenticateRequest";

export async function GET(req: NextRequest) {
  try {
    const userData = await authenticateRequest(req);
    const user = await prisma.user.findUnique({
      where: {
        telegramId: userData.user?.id
      },
      include: {
        donations: {
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });

    const userSerialized = {
      ...user,
      telegramId: Number(user?.telegramId),
      donations: user?.donations.map(donation => ({...donation, senderTelegramId: Number(donation.senderTelegramId)}))
    };
  
    return NextResponse.json(userSerialized, { status: 200 });
  } catch (error: Error | any) {
    return NextResponse.json({
      message: error.message,
    }, { status: error.message === "Wrong authorization type" ? 400 : 500 });
  }
}