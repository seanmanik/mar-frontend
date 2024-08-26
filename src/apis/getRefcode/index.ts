import { api } from "..";

export const getRefcode = async ({token}: {
  token: string;
}): Promise<string> => {
  const response = await api.get('User/GetReferralCode', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (response?.data || '')
};

