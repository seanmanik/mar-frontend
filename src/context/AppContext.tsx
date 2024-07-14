import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sepolia } from "viem/chains";
import { useChainId, useSwitchChain } from "wagmi";

interface AppContextType {
  userToken: string;
  setUserToken: (token: string) => void;
}

export const AppContext = createContext<AppContextType>({
  userToken: "",
  setUserToken: () => {},
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string>("");
  const { chains, switchChain } = useSwitchChain();
  const chainId = useChainId();

  useEffect(() => {
    if (chainId !== sepolia.id) {
      // switchChain({
      //   chainId: sepolia.id,
      // });
      toast.error("Wrong network!");
    }
  }, [chainId, switchChain]);

  return (
    <AppContext.Provider
      value={{
        userToken,
        setUserToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
