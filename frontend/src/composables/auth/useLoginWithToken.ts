import { useQuery } from "@tanstack/vue-query";
import { authApiService } from "../../services/authApiService";

export function useLoginWithToken() {
   const {
      data: loggedInUser,
      error: errorLoggedInUser,
      isLoading: isLoadingLoggedInUser,
      isSuccess: isSuccessLoggedInUser,
      isError: isErrorLoggedInUser,
      isFetched: isFetchedLoggedInUser,
      suspense,
   } = useQuery({
      queryKey: ["loggedInUser"],
      queryFn: authApiService.loginWithToken,
      retry: false,
   });

   return {
      loggedInUser,
      errorLoggedInUser,
      isLoadingLoggedInUser,
      isSuccessLoggedInUser,
      isErrorLoggedInUser,
      isFetchedLoggedInUser,
      suspense,
   };
}
