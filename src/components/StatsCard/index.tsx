import { Box, Stack, Typography } from "@mui/joy";
import { useHover } from "@uidotdev/usehooks";
import React from "react";

const StatsCard = ({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) => {
  const [ref, hovering] = useHover();

  return (
    <Stack
      ref={ref}
      direction="column"
      gap={1}
      padding={"12px"}
      borderRadius={"10px"}
      sx={{
        backgroundColor: "#ffffff",
        borderColor: "rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <img src={icon} width={40} height={40} />
        <Stack direction="column">
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.5)",
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: "#000000",
              fontSize: "20px",
            }}
          >
            {value}
          </Typography>
        </Stack>
      </Stack>
      {hovering && (
        <Box
          sx={{
            borderRadius: "10px",
            position: "absolute",
            zIndex: 10,
            top: "58px",
            left: 0,
            backgroundColor: "#ffffff",
            padding: "12px",
            width: "calc(100% - 24px)",
          }}
        >
          <Stack
            direction="column"
            sx={{
              padding: "12px",
              backgroundColor: "#F5F5F5",
              borderRadius: "10px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                paddingY: "6px",
                // position: 'absolute'
              }}
            >
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Staking:
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                300,000
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                paddingY: "6px",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Staking:
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                300,000
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                paddingY: "6px",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Staking:
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                300,000
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                paddingY: "6px",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Staking:
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                300,000
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                paddingY: "6px",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                Total:
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                300,000
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default StatsCard;
