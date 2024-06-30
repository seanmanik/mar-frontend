import { ReactNode, createContext, useState } from "react";

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
