import { api } from "..";
export interface IActivity {
  activityID: number
  tokenPoolID: number
  assetSymbol: string
  dripping: string
  quantity: number
  rewards: number
  rewardAsset: string
  status: string
  tvl: number
  activityDate: string
  type: string
  tokenType: string
  nftIds: number[],
  tokenPrice: number
}
export const getActivitiesRequest = async ({token}: {
  token: string;
}): Promise<[]> => {
  const response = await api.get('Activity/GetActivitySummary', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (response?.data?.activities || []).reverse()
};

