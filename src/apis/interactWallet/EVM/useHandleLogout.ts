import { useCallback, useContext } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { deleteItem } from "../../../utils/localStorage";
import { AppContext } from "../../../context/AppContext";
import { useSetRecoilState } from "recoil";
import { AuthTokenState } from "../../../state/AuthTokenState";
import { UserInfoState } from "../../../state/UserInfoState";

export const useHandleLogout = () => {
  const { disconnect } = useDisconnect();
  const setUserToken = useSetRecoilState(AuthTokenState)
  const setUserInfo = useSetRecoilState(UserInfoState)
  const account = useAccount();

  const onHandleLogout = useCallback(() => {
    try {
      if (account.address) {
        disconnect();
        // deleteItem(`${account.address}_signature`);
        setUserToken("");
        setUserInfo({
          level: 0,
          boostPercentage: 0
        })
      }
    } catch (error) {
      disconnect();
      setUserToken("");
      setUserInfo({
        level: 0,
        boostPercentage: 0
      })
    }
  }, [disconnect, account.address]);

  return { onHandleLogout };
};
