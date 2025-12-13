type Response<T> = {
   status: "success" | "fail";
   message: string;
   data: T;
};

export const handleServerResponseData = <T>(response: Response<T>): T => {
   if (response.status === "success") return response.data as T;
   if (response.status === "fail") throw new Error(response.message || "Server responded with fail status");
   throw new Error("Unexpected response status");
};
