import { api } from "..";
import { WithdrawRequestBody } from "./types";

export const withdrawRequest = async (data: WithdrawRequestBody): Promise<any> => {
  const response = await api.post("/Pool/Withdraw", data);

  return response;
};

export const onHandlePostWithdrawRequest = async (data: WithdrawRequestBody) => {
  try {
    const response = await withdrawRequest(data);
    return response;
  } catch (error) {
    console.log("error", error);
  }
}