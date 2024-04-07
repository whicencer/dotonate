import { User } from "@/types/User";

export async function getUserService(initDataRaw: string) {
  const response = await fetch("/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `tma ${initDataRaw}`
    },
  });
  const user = await response.json();

  return user as User;
}