import { Stack, Typography } from "@mui/joy";
import React from "react";
import { IconCoin } from "../../icons";

const BootsTag = () => {
  return (
    <Stack
      direction="row"
      gap={"4px"}
      alignItems="center"
      justifyContent="center"
      borderRadius={"6px"}
      bgcolor={"#000000"}
      paddingX={"6px"}
      paddingY={"2px"}
    >
      <img src={IconCoin} width={12} height={12} />
      <Typography fontWeight={700} fontSize={12} textColor="#ffffff">
        3X PUPPY
      </Typography>
    </Stack>
  );
};

export default BootsTag;
