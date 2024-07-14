import { ReactNode, createContext, useEffect, useState } from "react";
import { sepolia } from "viem/chains";
import { useChainId } from "wagmi";
import ModalSwitchNetwork from "../components/ModalSwitchNetwork";

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
  const chainId = useChainId();
  const [openModalSwitchNetwork, setOpenModalSwitchNetwork] = useState(false);


  useEffect(() => {
    if (chainId !== sepolia.id) {
      console.log("wrong network!");
      setOpenModalSwitchNetwork(true);
    } else {
      setOpenModalSwitchNetwork(false);
    }
  }, [chainId]);

  return (
    <AppContext.Provider
      value={{
        userToken,
        setUserToken,
      }}
    >
      {children}
      <ModalSwitchNetwork
        open={openModalSwitchNetwork}
        onClose={() => setOpenModalSwitchNetwork(false)}
      />
    </AppContext.Provider>
  );
};

export default AppContextProvider;
