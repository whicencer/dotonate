import { UserRoles } from "@/enums/UserRoles";

interface Props {
  username: string;
  role: UserRoles;
  tonAddress: string;
  telegramId: number | null;
}

export const createUser = async (user: Props) => {
  return await fetch('/api/user', {
    method: "POST",
    body: JSON.stringify(user, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ),
  });
};
