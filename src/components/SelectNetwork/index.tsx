import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/joy";
import React from "react";
import {
  ImageEthBlue,
  ImageLogoBlueSquare,
  ImageSolanaCircle,
} from "../../images";

const LIST_NETWORKS = [
  {
    label: "All Pools",
    value: "all",
    icon: <img src={ImageLogoBlueSquare} width={24} />,
  },
  {
    label: "Ethereum",
    value: "ethereum",
    icon: <img src={ImageEthBlue} width={24} />,
  },
  //   {
  //     label: "Solana",
  //     value: "solana",
  //     icon: <img src={ImageSolanaCircle} width={24} />,
  //   },
];

const SelectNetwork = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const createHandleClose = (index: number) => () => {
    if (typeof index === "number") {
      setSelectedIndex(index);
    }
  };

  return (
    <Dropdown>
      <MenuButton
        startDecorator={LIST_NETWORKS[selectedIndex].icon
        }
        endDecorator={<KeyboardArrowDown />}
      ></MenuButton>
      <Menu placement="bottom-end" sx={{
        width: "150px",
      }}>
        {LIST_NETWORKS.map((network, index) => {
          return (
            <MenuItem
              onClick={createHandleClose(index)}
              sx={{
                padding: "16px 12px",
              }}
            >
              <Stack direction="row" alignItems="center" gap={1.5}>
                {network.icon}
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#000000",
                  }}
                >
                  {network.label}
                </Typography>{" "}
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </Dropdown>
  );
};

export default SelectNetwork;
