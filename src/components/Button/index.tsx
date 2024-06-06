import { Button as JoyButton, ButtonProps, Stack, Typography } from "@mui/joy";
import React from "react";

export interface IButtonProps extends ButtonProps {
  buttonType: "primary" | "secondary";
  justifyContentChild?: "space-between" | "center";
}

const Button = ({
  justifyContentChild = "space-between",
  sx,
  buttonType,
  children,
  endDecorator,
  ...props
}: IButtonProps) => {
  if (buttonType === "secondary") {
    return (
      <JoyButton
        {...props}
        variant="outlined"
        sx={{
          ...sx,
          paddingX: "20px",
          paddingY: "12px",
          borderRadius: "12px",
          border: "1px solid #dcdcdc",
          color: "#000000",
        }}
      >
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent={justifyContentChild}
          gap={1}
        >
          <Typography fontWeight={500} fontSize={16} textColor="#000000">
            {children}
          </Typography>
          {endDecorator}
        </Stack>
      </JoyButton>
    );
  }

  return (
    <JoyButton
      {...props}
      variant="solid"
      sx={{
        ...sx,
        paddingX: "20px",
        paddingY: "12px",
        borderRadius: "12px",
        backgroundColor: "#000000",
      }}
    >
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent={justifyContentChild}
        gap={1}
      >
        <Typography fontWeight={500} fontSize={16} textColor="#ffffff">
          {children}
        </Typography>
        {endDecorator}
      </Stack>
    </JoyButton>
  );
};

export default Button;
