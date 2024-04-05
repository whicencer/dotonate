import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const username = params.username;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    return NextResponse.json(!!user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: true,
      message: error
    }, { status: 500 });
  }
}