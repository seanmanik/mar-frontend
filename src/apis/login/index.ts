import { api } from "..";
import { LoginRequestBody } from "./types";

export const loginRequest = async (data: LoginRequestBody): Promise<{
  level: number
  token: string,
  boostPercentage: number
}> => {
  const response = await api.post("/User/Login", data);

  return response.data;
};
