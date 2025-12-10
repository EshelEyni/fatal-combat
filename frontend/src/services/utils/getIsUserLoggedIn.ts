import { useQueryClient } from "@tanstack/vue-query";

export const getIsUserLoggedIn = async () => {
   const qc = useQueryClient();

   try {
      const user = await qc.ensureQueryData({ queryKey: ["loggedInUser"] });
      return user;
   } catch {
      return null;
   }
};
