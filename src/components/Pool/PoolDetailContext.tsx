import { ReactNode, createContext, useEffect, useState } from "react";

interface PoolDetailContextType {
    onHandleRefetchData: () => void;
    userStaked: number;
    decimals: number;
    poolAddress: string;
    tokenAddress: string;
    symbol: string;
    poolId: number | string;
}

interface PoolDetailContextProviderProps extends PoolDetailContextType {
  children: ReactNode;
}

export const PoolDetailContext = createContext<PoolDetailContextType>({
  onHandleRefetchData: () => {},
  userStaked: 0,
  decimals: 18,
  poolAddress: "",
  tokenAddress: "",
  symbol: "",
  poolId: 0,
});

const PoolDetailContextProvider = ({
  children,
  onHandleRefetchData,
  userStaked,
  decimals,
  poolAddress,
  tokenAddress,
  symbol,
  poolId,
}: PoolDetailContextProviderProps) => {
  return (
    <PoolDetailContext.Provider
      value={{
        onHandleRefetchData,
        userStaked,
        decimals,
        poolAddress,
        tokenAddress,
        symbol,
        poolId,
      }}
    >
      {children}
    </PoolDetailContext.Provider>
  );
};

export default PoolDetailContextProvider;
