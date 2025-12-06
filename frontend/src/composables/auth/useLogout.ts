import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { authApiService } from "../../services/authApiService";

export function useLogout() {
   const queryClient = useQueryClient();

   const { mutate: logout, isPending: isPendingLogout } = useMutation({
      mutationFn: authApiService.logout,
      onSuccess: () => {
         queryClient.setQueryData(["loggedInUser"], null);
      },
   });

   return { logout, isPendingLogout };
}
