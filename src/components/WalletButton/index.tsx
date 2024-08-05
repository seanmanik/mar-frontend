import { Button, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { memo } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { IconETH } from "../../icons";
import { ArrowDropDown, Wallet } from "@mui/icons-material";
import { useHandleLogout } from "../../apis/interactWallet/EVM/useHandleLogout";
import { sepolia } from "viem/chains";
import { useIsCorrectNetwork } from "../../hooks/useIsCorrectNetwork";

export default memo<{
  onClick: () => void;
  onInviteFriendsClick?: () => void;
  onAccountDetailsClick?: () => void;
}>(({ onClick, onInviteFriendsClick, onAccountDetailsClick }) => {
  const account = useAccount();
  const { onHandleLogout } = useHandleLogout();
  const { chains, switchChain } = useSwitchChain();
  const checkNetwork = useIsCorrectNetwork()


  const onHandleSwitchNetwork = (id: number) => {
    switchChain({
      chainId: id,
    });
  }

  if (!account || !account.isConnected) {
    return (
      <Button
        color="primary"
        onClick={onClick}
        endDecorator={<Wallet fontSize="small" />}
      >
        Connect
      </Button>
    );
  }

  return (
    <Dropdown>
      <MenuButton
        startDecorator={<img src={IconETH} width={"24px"} />}
        endDecorator={<ArrowDropDown />}
        sx={{
          background: !checkNetwork.isCorrect ? '#ff5858 !important': '',
          borderColor: !checkNetwork.isCorrect ? '#ff5858 !important': ''
        }}
      >
        <b>{!checkNetwork.isCorrect ? `WRONG NETWORK (${account.address?.slice(0, 6)}...${account.address?.slice(-4)})`: `${account.address?.slice(0, 6)}...${account.address?.slice(-4)}`}</b>
      </MenuButton>
      <Menu sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}>
        {!checkNetwork.isCorrect && checkNetwork.supportedNetworks.map(e => (
          <MenuItem key={e.id} onClick={() => onHandleSwitchNetwork(e.id)} sx={{color: 'green'}}><b>Switch network to {e.name.toUpperCase()}</b></MenuItem>
        ))}
        <MenuItem onClick={onAccountDetailsClick}>Account Details</MenuItem>
        <MenuItem onClick={onInviteFriendsClick}>Invite Friends</MenuItem>
        <MenuItem onClick={() => onHandleLogout()}>Disconnect</MenuItem>
      </Menu>
    </Dropdown>
  );
});
