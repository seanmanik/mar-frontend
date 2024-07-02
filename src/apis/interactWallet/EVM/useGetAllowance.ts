import { Abi, Address } from "viem";
import { useReadContract } from "wagmi";

export const useGetAllowance = ({
  contractAddress,
  ownerAddress,
  spenderAddress,
  abi,
}: {
  contractAddress: string;
  ownerAddress: string;
  spenderAddress: string;
  abi: any;
}): {
  data: number;
  isLoading: boolean;
} => {
  const { data, isLoading } = useReadContract({
    abi: abi,
    address: contractAddress as Address,
    functionName: "allowance",
    args: [ownerAddress, spenderAddress],
  });

  console.log(data);

  return {
    data: (data as number) || 0,
    isLoading,
  };
};
