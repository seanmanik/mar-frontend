import { Button, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { memo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { IconETH, IconWallet } from "../../icons";
import { ArrowDropDown } from "@mui/icons-material";

export default memo<{
    onClick: () => void
}>(({onClick}) => {

    const account = useAccount()
    const { disconnect } = useDisconnect()
    
    if (!account || !account.isConnected) {
        return (
            <Button color="primary"
                onClick={onClick}
            >
                Connect <img src={IconWallet} style={{marginLeft: 5}} />
            </Button>
        )
    }

    return (
        <Dropdown>
            <MenuButton startDecorator={<img src={IconETH} width={"24px"}/>} endDecorator={<ArrowDropDown />}>
                    {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
            </MenuButton>
            <Menu sx={{ minWidth: 160, '--ListItemDecorator-size': '24px' }}>
                <MenuItem>
                    Account Details
                </MenuItem>
                <MenuItem onClick={() => disconnect()}>
                    Disconnect
                </MenuItem>
            </Menu>
        </Dropdown>
    )
})