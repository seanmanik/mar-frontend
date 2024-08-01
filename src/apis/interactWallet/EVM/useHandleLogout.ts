import { useCallback, useContext } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { deleteItem } from "../../../utils/localStorage";
import { AppContext } from "../../../context/AppContext";
import { useSetRecoilState } from "recoil";
import { AuthTokenState } from "../../../state/AuthTokenState";

export const useHandleLogout = () => {
  const { disconnect } = useDisconnect();
  const setUserToken = useSetRecoilState(AuthTokenState)
  const account = useAccount();

  const onHandleLogout = useCallback(() => {
    try {
      if (account.address) {
        disconnect();
        // deleteItem(`${account.address}_signature`);
        setUserToken("");
      }
    } catch (error) {
      disconnect();
      setUserToken("");
    }
  }, [disconnect, account.address]);

  return { onHandleLogout };
};
