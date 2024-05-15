"use server";

import { UserRoles } from "@/enums/UserRoles";
import { encrypt } from "@/helpers/crypto";
import prisma from "@/lib/prisma";

interface Props {
  username: string;
  role: UserRoles;
  tonAddress: string;
  telegramId: number;
}

export async function createUser(user: Props) {
  const hashedTonAddress = await encrypt(user.tonAddress);

  try {
    const createdUser = await prisma.user.create({
      data: {
        username: user.username,
        telegramId: user.telegramId,
        role: user.role,
        tonAddress: hashedTonAddress
      }
    });

    return {
      createdUser: {
        ...createdUser,
        telegramId: Number(createdUser.telegramId),
        minDonate: Number(createdUser.minDonate)
      },
      message: "Success"
    };
  } catch (error: Error | any) {
    console.log(error);
  }
}