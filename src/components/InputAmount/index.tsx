import { Box, Button, Input, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Error as ErrorIcon } from "@mui/icons-material";
import TokenToIcon from "../../utils/TokenToIcon";

const NumericFormatAdapter = React.forwardRef<NumericFormatProps, any>(
  function NumericFormatAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  }
);

export default memo<{
  title: string;
  symbol: string;
  value: number;
  balance: number;
  onChange?: (value: number) => void;
  subTitle: string;

}>(({ symbol, value, balance, title, onChange, subTitle }) => {
  const btPercentStyle = {
    size: "sm",
    variant: "outlined",
    color: "neutral",
    sx: {
      borderRadius: 100,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 1,
      paddingLeft: 1,
      fontSize: 12,
      minHeight: 25,
    },
  };

  const error = value > balance ? "Not Enough Balance" : "";

  return (
    <Box>
      <Box
        sx={{
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
          borderColor: error ? "#ff9595" : "#e0e0e0",
          padding: 1,
        }}
      >
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <img src={TokenToIcon[symbol]} width={40} />
          <Box flex={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography level="title-sm" color="neutral">
                {title}
              </Typography>
              <Typography level="title-sm" color="neutral" textAlign={"right"}>
                {subTitle}: {parseFloat(balance.toFixed(2)).toLocaleString()}{" "}
                {symbol}
              </Typography>
            </Stack>
            <Input
              endDecorator={
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  spacing={1}
                >
                  <Button
                    {...(btPercentStyle as any)}
                    onClick={() => {
                      onChange && onChange(balance * 0.25);
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    {...(btPercentStyle as any)}
                    onClick={() => {
                      onChange && onChange(balance * 0.5);
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    {...(btPercentStyle as any)}
                    onClick={() => {
                      onChange && onChange(balance);
                    }}
                  >
                    100%
                  </Button>
                </Stack>
              }
              value={value}
              onChange={(e) => {
                var v = parseFloat(e.target.value);
                onChange && onChange(v);
              }}
              placeholder="Enter amount"
              slotProps={{
                input: {
                  component: NumericFormatAdapter,
                  max: balance,
                  min: 0,
                  sx: {
                    width: "100%",
                  },
                },
              }}
              variant="plain"
              sx={{
                width: "100%",
                fontSize: "20px",
                fontWeight: 600,
                padding: 0,
                "--Input-radius": "0px",
                borderBottom: "none",
                borderColor: "neutral.outlinedBorder",
                "&:hover": {
                  borderColor: "neutral.outlinedHoverBorder",
                },
                "&::before": {
                  border: "none",
                  transform: "scaleX(0)",
                  left: 0,
                  right: 0,
                  bottom: "-2px",
                  top: "unset",
                  transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                  borderRadius: 0,
                },
                "&:focus-within::before": {
                  transform: "scaleX(1)",
                },
              }}
            />
          </Box>
        </Stack>
      </Box>
      {error && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={0.5}
          marginTop={1}
        >
          <ErrorIcon fontSize="small" color="error" />
          <Typography level="body-sm" color="danger">
            {error}
          </Typography>
        </Stack>
      )}
    </Box>
  );
});
