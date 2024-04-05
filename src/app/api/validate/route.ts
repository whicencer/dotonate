import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { validate, parse } from "@tma.js/init-data-node";

export async function GET(req: Request) {
  const [authType, authData = ""] = (req.headers.get("authorization") || "").split(" ");
  const token = process.env.MODE === "development"
    ? process.env.DEV_BOT_TOKEN || ""
    : process.env.BOT_TOKEN || "";

  switch (authType) {
    case "tma":
      try {
        const parsedAuthData = parse(authData);

        validate(authData, token, {
          expiresIn: 3600,
        });
        const user = await prisma.user.findUnique({
          where: {
            telegramId: parsedAuthData.user?.id
          }
        });

        return NextResponse.json({
          data: {
            authData: parsedAuthData,
            userExists: !!user
          },
          message: "Success authorization",
        }, { status: 200 });
      } catch (e) {
        console.log(e);
        return NextResponse.json({
          message: "Error occured on authorization",
        }, { status: 500 });
      }
    default:
      return NextResponse.json({
        message: "Wrong authorization type",
      }, { status: 500 });
  }
}