import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { logout } from "../services/authApiService";

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: onLogout, isPending: isPendingLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["loggedInUser"], null);
    },
  });

  return { onLogout, isPendingLogout };
}
