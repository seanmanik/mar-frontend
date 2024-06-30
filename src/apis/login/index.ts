import { api } from "..";
import { LoginRequestBody } from "./types";

export const loginRequest = async (data: LoginRequestBody): Promise<void> => {
  const response = await api.post("/User/Login", data);

  return response.data;
};
