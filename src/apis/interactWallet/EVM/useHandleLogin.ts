import { useCallback, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { configurations } from "../../../constants/configurations";
import { getItem, setItem } from "../../../utils/localStorage";
import { useHandleLogout } from "./useHandleLogout";
import { loginRequest } from "../../login";
import { Address } from "viem";
import { useSetRecoilState } from "recoil";
import { AuthTokenState } from "../../../state/AuthTokenState";
import { UserInfoState } from "../../../state/UserInfoState";

export const useHandleLogin = ({
  actionCallBack,
}: {
  actionCallBack?: () => void;
}) => {
  const account = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { onHandleLogout } = useHandleLogout();
  const setAuthTokenState = useSetRecoilState(AuthTokenState)
  const setUserInfoState = useSetRecoilState(UserInfoState)

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
        setAuthTokenState(result.token);
        setUserInfoState({
          level: result.level,
          boostPercentage: result.boostPercentage
        })

        actionCallBack && actionCallBack();
      } catch (ex) {
        onHandleLogout();
      }
    } else {
      actionCallBack && actionCallBack();
    }
  }, [signMessageAsync, actionCallBack, account.address, onHandleLogout]);

  useEffect(() => {
    const onLogin = async () => {
      try {
        const result = await loginRequest({
          WalletAddress: account.address as Address,
          Signature: getItem(`${account.address}_signature`) as string,
          BlockchainType: configurations.EVM_BLOCKCHAIN_TYPE,
          Message: configurations.MESSAGE_LOGIN,
        });

        setAuthTokenState(result.token);
        setUserInfoState({
          level: result.level,
          boostPercentage: result.boostPercentage
        })
      } catch (error) {
        setAuthTokenState("");
        setUserInfoState({
          level: 0,
          boostPercentage: 0
        })
      }
    };

    if (account.address && getItem(`${account.address}_signature`)) {
      onLogin();
    }
  }, [account.address]);

  return { onHandleLogin };
};
