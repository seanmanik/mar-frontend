import {
  Button as JoyButton,
  ButtonProps,
  Stack,
  Typography,
  Box,
} from "@mui/joy";
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
  loading,
  ...props
}: IButtonProps) => {
  if (buttonType === "secondary") {
    return (
      <JoyButton
        {...props}
        loading={loading}
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
          {loading ? (
            <Box height={"24px"}></Box>
          ) : (
            <>
              <Typography fontWeight={500} fontSize={16} textColor="#000000">
                {children}
              </Typography>
              {endDecorator}
            </>
          )}
        </Stack>
      </JoyButton>
    );
  }

  return (
    <JoyButton
      {...props}
      loading={loading}
      variant="solid"
      sx={{
        ...sx,
        paddingX: "20px",
        paddingY: "12px",
        borderRadius: "12px",
        backgroundColor: "#000000",
        ":disabled": {
          background: "#c5c5c5",
          border: "1px solid #9d9d9d",
        },
      }}
    >
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent={justifyContentChild}
        gap={1}
      >
        {loading ? (
          <Box height={"24px"}></Box>
        ) : (
          <Typography fontWeight={500} fontSize={16} textColor="#ffffff">
            {children}
          </Typography>
        )}
      </Stack>
    </JoyButton>
  );
};

export default Button;
