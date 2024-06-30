import { useCallback } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { deleteItem } from "../../utils/localStorage";

export const useHandleLogout = () => {
  const { disconnect } = useDisconnect();
  const account = useAccount();

  const onHandleLogout = useCallback(() => {
    try {
      if (account.address) {
        disconnect();
        deleteItem(`${account.address}_signature`);
      }
    } catch (error) {
      disconnect();
    }
  }, [disconnect, account.address]);

  return { onHandleLogout };
};
