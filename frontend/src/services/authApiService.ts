import type { User } from "../type/user";
import { httpService } from "./httpService";
import { handleServerResponseData } from "./utils/handleServerResponseData";

const baseUrl = "auth";

const signup = async (body: { username: string; password: string }): Promise<User> => {
   const res = await httpService.post(`${baseUrl}/signup`, body);
   return handleServerResponseData<User>(res);
};

const login = async (body: { username: string; password: string }): Promise<User> => {
   const res = await httpService.post(`${baseUrl}/login`, body);
   return handleServerResponseData<User>(res);
};

const loginWithToken = async (): Promise<User> => {
   const res = await httpService.get(`${baseUrl}/login-with-token`);
   return handleServerResponseData<User>(res);
};

async function logout(): Promise<void> {
   await httpService.post(`${baseUrl}/logout`);
}

export const authApiService = {
   signup,
   login,
   loginWithToken,
   logout,
};
