import { ReactNode, createContext, useEffect, useState } from "react";
import { deleteItem } from "../utils/localStorage";
import { useAccount, useDisconnect } from "wagmi";

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

  const { disconnect } = useDisconnect();
  const account = useAccount();

  useEffect(() => {
    if (!userToken) {
      disconnect();
      deleteItem(`${account.address}_signature`);
    }
  }, []);

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
