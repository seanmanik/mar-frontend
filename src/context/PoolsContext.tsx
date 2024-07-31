import { ReactNode, createContext, useEffect, useState } from "react";

interface PoolsContextType {
  refecthGetUserStakedOfPoolMultiCall: () => void;
  refecthGetTotalStakedOfPoolMultiCall: () => void;
}

interface PoolsContextProviderProps extends PoolsContextType {
  children: ReactNode;
}

export const PoolsContext = createContext<PoolsContextType>({
  refecthGetUserStakedOfPoolMultiCall: () => {},
  refecthGetTotalStakedOfPoolMultiCall: () => {}
});

const PoolsContextProvider = ({
  children,
  refecthGetUserStakedOfPoolMultiCall,
  refecthGetTotalStakedOfPoolMultiCall
}: PoolsContextProviderProps) => {
  return (
    <PoolsContext.Provider
      value={{
        refecthGetUserStakedOfPoolMultiCall,
        refecthGetTotalStakedOfPoolMultiCall
      }}
    >
      {children}
    </PoolsContext.Provider>
  );
};

export default PoolsContextProvider;
