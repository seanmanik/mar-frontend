import { ReactNode, createContext, useEffect, useState } from "react";
import { sepolia } from "viem/chains";
import { useChainId } from "wagmi";
import ModalSwitchNetwork from "../components/ModalSwitchNetwork";
import ModalUserAgreement from "../components/ModalUserAgreement";
import ModalConnectWallet from "../components/ModalConnectWallet";
import ModalInviteFriends from "../components/ModalInviteFriends";
import ModalAccountDetails from "../components/ModalAccountDetails";

interface AppContextType {
  userToken: string;
  setUserToken: (token: string) => void;
  setOpenModalUserAgreement: (open: boolean) => void;
  setOpenModalInviteFriends: (open: boolean) => void;
  setOpenModalAccountDetails: (open: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  userToken: "",
  setUserToken: () => {},
  setOpenModalUserAgreement: () => {},
  setOpenModalInviteFriends: () => {},
  setOpenModalAccountDetails: () => {},
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string>("");

  const [openModalConnectWallet, setOpenModalConnectWallet] = useState(false);
  const [openModalUserAgreement, setOpenModalUserAgreement] = useState(false);
  const [openModalInviteFriends, setOpenModalInviteFriends] = useState(false);
  const [openModalAccountDetails, setOpenModalAccountDetails] = useState(false);

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
        setOpenModalUserAgreement,
        setOpenModalInviteFriends,
        setOpenModalAccountDetails,
      }}
    >
      {children}
      <ModalSwitchNetwork
        open={openModalSwitchNetwork}
        onClose={() => setOpenModalSwitchNetwork(false)}
      />

      <ModalUserAgreement
        open={openModalUserAgreement}
        onClose={() => setOpenModalUserAgreement(false)}
        onAgreed={() => {
          setOpenModalUserAgreement(false);
          setOpenModalConnectWallet(true);
        }}
      />
      <ModalConnectWallet
        open={openModalConnectWallet}
        onClose={() => setOpenModalConnectWallet(false)}
      />
      <ModalInviteFriends
        open={openModalInviteFriends}
        onClose={() => setOpenModalInviteFriends(false)}
      />
      <ModalAccountDetails
        open={openModalAccountDetails}
        onClose={() => setOpenModalAccountDetails(false)}
      />
    </AppContext.Provider>
  );
};

export default AppContextProvider;
