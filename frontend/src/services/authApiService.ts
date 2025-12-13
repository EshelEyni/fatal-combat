import { AuthInputSchema, type AuthInput } from "../schemas/authInput";
import { UserSchema, type User } from "../schemas/user";
import { httpService } from "./httpService";
import { handleServerResponseData } from "./utils/handleServerResponseData";

const baseUrl = "auth";

const signup = async (body: AuthInput): Promise<User> => {
   const parsedBody = AuthInputSchema.parse(body);
   const res = await httpService.post(`${baseUrl}/signup`, parsedBody);

   const data = handleServerResponseData(res);

   return UserSchema.parse(data);
};

const login = async (body: AuthInput): Promise<User> => {
   const parsedBody = AuthInputSchema.parse(body);
   const res = await httpService.post(`${baseUrl}/login`, parsedBody);

   const data = handleServerResponseData(res);
   console.log(data);
   return UserSchema.parse(data);
};

const loginWithToken = async (): Promise<User> => {
   const res = await httpService.get(`${baseUrl}/login-with-token`);

   const data = handleServerResponseData(res);
   return UserSchema.parse(data);
};

const logout = async (): Promise<void> => {
   await httpService.post(`${baseUrl}/logout`);
};

export const authApiService = {
   signup,
   login,
   loginWithToken,
   logout,
};
