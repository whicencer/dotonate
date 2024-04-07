import { useState, useEffect } from "react";
import { getUserService } from "@/services/getUserService";
import { User } from "@/types/User";

export function useUserProfileData(initDataRaw: string = "") {
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getUserService(initDataRaw || "");

        if (user) {
          setUser(user);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error fetching user info: ", error);
      }
    };

    getUserInfo();
  }, [initDataRaw]);

  return {user, isLoading};
}
