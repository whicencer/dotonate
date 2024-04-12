import { User } from "@/types/User";

export async function getUserService(username: string) {
  const response = await fetch(`/api/user/${username}`);
  const user = await response.json();

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return user as User;
}