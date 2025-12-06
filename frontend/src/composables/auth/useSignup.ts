import { useMutation } from "@tanstack/vue-query";
import { authApiService } from "../../services/authApiService";

export const useSignup = () => {
   const {
      mutate: signup,
      isPending: isPendingSignup,
      isError: isErrorSignup,
      error: errorSignup,
   } = useMutation({
      mutationFn: authApiService.signup,
      onSuccess: data => {
         console.log("Signup success:", data);
      },
      onError: (e: Error) => {
         console.log(e.message);
      },
   });

   return { signup, isPendingSignup, isErrorSignup, errorSignup };
};
