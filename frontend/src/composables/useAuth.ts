import { useQuery } from "@tanstack/vue-query";
import { loginWithToken } from "../services/loginApiService";

export function useAuth() {
  const {
    data: loggedInUser,
    error: errorLoggedInUser,
    isLoading: isLoadingLoggedInUser,
    isSuccess: isSuccessLoggedInUser,
    isError: isErrorLoggedInUser,
    isFetched: isFetchedLoggedInUser,
  } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: loginWithToken,
    retry: false,
  });

  return {
    loggedInUser,
    errorLoggedInUser,
    isLoadingLoggedInUser,
    isSuccessLoggedInUser,
    isErrorLoggedInUser,
    isFetchedLoggedInUser,
  };
}
