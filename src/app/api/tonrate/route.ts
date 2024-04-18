import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("https://tonapi.io/v2/rates?tokens=ton&currencies=ton,usd");
  const data = await response.json();

  return NextResponse.json(data, { status: 200 });
}