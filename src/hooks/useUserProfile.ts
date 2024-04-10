import { useState, useEffect } from "react";
import { getUserProfileService } from "@/services/getUserProfileService";
import { User } from "@/types/User";

export function useUserProfile(initDataRaw: string = "") {
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getUserProfileService(initDataRaw || "");

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
