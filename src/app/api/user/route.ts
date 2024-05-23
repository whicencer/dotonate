import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create user (Register)
export async function POST(request: Request) {
  const userData = await request.json();

  try {
    const createdUser = await prisma.user.create({
      data: {
        ...userData
      }
    });

    // TODO: Fix govnocode
    return NextResponse.json({
      createdUser: {
        ...createdUser,
        telegramId: Number(createdUser.telegramId)
      },
      message: "Success",
    }, { status: 200 });
  } catch (error: Error | any) {
    console.log(error);
    return NextResponse.json({
      error: true,
      message: error.message,
    }, { status: 500 });
  }
}