import { ReactNode, createContext, useEffect, useState } from "react";

interface PoolsContextType {
  refecthGetUserStakedOfPoolMultiCall: () => void;
}

interface PoolsContextProviderProps extends PoolsContextType {
  children: ReactNode;
}

export const PoolsContext = createContext<PoolsContextType>({
  refecthGetUserStakedOfPoolMultiCall: () => {},
});

const PoolsContextProvider = ({
  children,
  refecthGetUserStakedOfPoolMultiCall,
}: PoolsContextProviderProps) => {
  return (
    <PoolsContext.Provider
      value={{
        refecthGetUserStakedOfPoolMultiCall,
      }}
    >
      {children}
    </PoolsContext.Provider>
  );
};

export default PoolsContextProvider;
