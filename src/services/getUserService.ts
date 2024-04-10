import { User } from "@/types/User";

export async function getUserService(username: string) {
  const response = await fetch(`/api/user/${username}`);
  const user = await response.json();

  return user as User;
}