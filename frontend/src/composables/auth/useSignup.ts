import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { authApiService } from "../../services/authApiService";

export const useSignup = () => {
   const queryClient = useQueryClient();

   const {
      mutate: signup,
      isPending: isPendingSignup,
      isError: isErrorSignup,
      error: errorSignup,
   } = useMutation({
      mutationFn: authApiService.signup,
      onSuccess: data => {
         queryClient.setQueryData(["loggedInUser"], data);
      },
      onError: (e: Error) => {
         console.log(e.message);
      },
   });

   return { signup, isPendingSignup, isErrorSignup, errorSignup };
};
