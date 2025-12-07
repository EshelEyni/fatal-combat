import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { authApiService } from "../../services/authApiService";

export const useLogin = () => {
   const queryClient = useQueryClient();

   const {
      mutate: login,
      isPending: isPendingLogin,
      isError: isErrorLogin,
      error: errorLogin,
   } = useMutation({
      mutationFn: authApiService.login,
      onSuccess: data => {
         console.log("Login success:", data);

         queryClient.setQueryData(["loggedInUser"], data);
      },
      onError: (e: Error) => {
         console.log(e.message);
      },
   });

   return { login, isPendingLogin, isErrorLogin, errorLogin };
};
