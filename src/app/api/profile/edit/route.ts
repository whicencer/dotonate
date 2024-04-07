import prisma from "@/lib/prisma";
import { authenticateRequest } from "@/app/api/services/authenticateRequest";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const body = await req.json();

  try {
    // Authenticate current user
    const { user } = await authenticateRequest(req);
    const updatedUserData = await prisma.user.update({
      where: {
        telegramId: user?.id
      },
      data: {
        minDonate: body.minDonate,
        description: body.description
      }
    });

    return NextResponse.json({ ...updatedUserData, telegramId: Number(updatedUserData.telegramId) }, { status: 200 });
  } catch (error: Error | any) {
    return NextResponse.json({
      message: error.message,
    }, { status: error.message === "Wrong authorization type" ? 400 : 500 });
  }
}