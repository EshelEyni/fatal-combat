import { httpService } from "./httpService";

const baseUrl = "auth";

const signup = async (body: { username: string; password: string }) => {
   return await httpService.post(`${baseUrl}/signup`, body);
};

const login = async (body: { username: string; password: string }) => {
   return await httpService.post(`${baseUrl}/login`, body);
};

const loginWithToken = async () => {
   return await httpService.get(`${baseUrl}/login-with-token`);
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
