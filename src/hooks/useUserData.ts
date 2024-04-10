import { useState, useEffect } from "react";
import { getUserProfileService } from "@/services/getUserProfileService";
import { User } from "@/types/User";
import { getUserService } from "@/services/getUserService";

export function useUserData(username: string) {
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getUserService(username);

        if (user) {
          setUser(user);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error fetching user info: ", error);
      }
    };

    getUserInfo();
  }, [username]);

  return { user, isLoading };
}
