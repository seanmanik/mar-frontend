import { useCallback, useContext } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { configurations } from "../../constants/configurations";
import { getItem, setItem } from "../../utils/localStorage";
import { useHandleLogout } from "./useHandleLogout";
import { loginRequest } from "../login";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

export const useHandleLogin = ({
  actionCallBack,
}: {
  actionCallBack?: () => void;
}) => {
  const account = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { onHandleLogout } = useHandleLogout();
  const { setUserToken } = useContext(AppContext);

  const onHandleLogin = useCallback(async () => {
    if (!getItem(`${account.address}_signature`) && account.address) {
      try {
        var value = await signMessageAsync({
          message: configurations.MESSAGE_LOGIN,
        });

        setItem(`${account.address}_signature`, value);

        const result = await loginRequest({
          WalletAddress: account.address,
          Signature: value,
          BlockchainType: configurations.EVM_BLOCKCHAIN_TYPE,
          Message: configurations.MESSAGE_LOGIN,
        });

        console.log(result, "result");

        // setUserToken(result.token)

        actionCallBack && actionCallBack();
        toast.success("Login success");
      } catch (ex) {
        onHandleLogout();
        toast.error("Login failed");
      }
    } else {
      actionCallBack && actionCallBack();
    }
  }, [signMessageAsync, actionCallBack, account.address, onHandleLogout]);

  return { onHandleLogin };
};
