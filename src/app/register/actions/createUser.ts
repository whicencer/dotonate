"use server";

import { UserRoles } from "@/enums/UserRoles";

interface Props {
  username: string;
  role: UserRoles;
  tonAddress: string;
  telegramId: number | null;
}

export async function createUser(user: Props) {
  try {
    return await fetch('/api/user', {
      method: "POST",
      body: JSON.stringify(user, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ),
    });
  } catch (error: any) {
    console.log(`Failed to register: ${error.message}`);
    throw new Error(`Failed to register: ${error.message}`);
  }
}