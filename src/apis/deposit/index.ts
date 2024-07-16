import { api } from "..";
import { DepositRequestBody } from "./types";

export const depositRequest = async (data: DepositRequestBody): Promise<any> => {
  const response = await api.post("/Pool/Deposit", data);

  return response;
};

export const onHandlePostDepositRequest = async (data: DepositRequestBody) => {
  try {
    const response = await depositRequest(data);
    return response;
  } catch (error) {
    console.log("error", error);
  }
}
