import { httpService } from "./httpService";

export const signup = async (body: { username: string; password: string }) => {
  return await httpService.post("auth/signup", body);
};

export const login = async (body: { username: string; password: string }) => {
  return await httpService.post("auth/login", body);
};

export const loginWithToken = async () => {
  return await httpService.get("auth/login-with-token");
};
