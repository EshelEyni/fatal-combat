import { httpService } from "./httpService";

const baseUrl = "auth";

export const signup = async (body: { username: string; password: string }) => {
  return await httpService.post(`${baseUrl}/signup`, body);
};

export const login = async (body: { username: string; password: string }) => {
  return await httpService.post(`${baseUrl}/login`, body);
};

export const loginWithToken = async () => {
  return await httpService.get(`${baseUrl}/login-with-token`);
};

export async function logout(): Promise<void> {
  await httpService.post(`${baseUrl}/logout`);
}
