import { api } from "..";
import { IEstimateInput, IEstimateOutput } from "./types";

export const depositRequest = async (token: string, data: IEstimateInput): Promise<IEstimateOutput> => {
  const response = await api.post("/Pool/DepositRequest", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as IEstimateOutput;
};