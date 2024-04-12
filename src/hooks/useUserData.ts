import { useState, useEffect } from "react";
import { User } from "@/types/User";
import { getUserService } from "@/services/getUserService";

export function useUserData(username: string) {
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getUserService(username);

        if (user) {
          setUser(user);
        }
      } catch (error: Error | any) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, [username]);

  return { user, isLoading, error };
}
