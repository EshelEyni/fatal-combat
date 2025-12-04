import { httpService } from "./httpService";

export const login = async (body: { username: string; password: string }) => {
  return await httpService.post("auth/login/", body);
};
