import { parse, validate } from "@tma.js/init-data-node";
import { NextRequest } from "next/server";

export async function authenticateRequest(req: NextRequest) {
  const [authType, authData = ""] = (req.headers.get("authorization") || "").split(" ");
  const token = process.env.MODE === "development"
    ? process.env.DEV_BOT_TOKEN || ""
    : process.env.BOT_TOKEN || "";

  if (authType !== "tma") {
    throw new Error("Wrong authorization type");
  }

  try {
    const parsedAuthData = parse(authData);
    validate(authData, token, {
      expiresIn: 3600,
    });

    return parsedAuthData;
  } catch (e) {
    console.error(e);
    throw new Error("Error occurred on authorization");
  }
}
