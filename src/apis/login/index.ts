import { api } from "..";
import { LoginRequestBody } from "./types";

export const loginRequest = async (data: LoginRequestBody): Promise<{
  level: number
  token: string,
  boostPercentage: number
}> => {
  var reqData: any = {
    ...data
  }

  if (location.search) {
    reqData.referralCode =  location.search.replace('?', '')
  }
  // if (localStorage.getItem('refCode')) {
  //   reqData.referralCode = localStorage.getItem('refCode')
  // }
  const response = await api.post("/User/Login", reqData);

  return response.data;
};
