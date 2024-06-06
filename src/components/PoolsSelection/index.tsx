import { Box, Stack, Typography } from "@mui/joy";
import React from "react";

const PoolsSelection = ({
  poolSelected,
  setPoolSelected,
}: {
  poolSelected: string;
  setPoolSelected: (_: string) => void;
}) => {
  return (
    <Stack
      direction="row"
      gap={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="column">
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "24px",
            color: "#ffffff",
          }}
        >
          Explore pools
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          Deposit and Earn Points
        </Typography>
      </Stack>

      <Stack
        direction="row"
        gap="4px"
        alignItems="center"
        sx={{
          paddingX: "12px",
          paddingY: "8px",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: "#ffffff",
          borderRadius: "60px",
        }}
      >
        <div onClick={() => setPoolSelected("all")}>
          <Box
            sx={{
              paddingX: "20px",
              paddingY: "8px",
              backgroundColor: poolSelected === "all" ? "#000000" : "#ffffff",
              borderRadius: "30px",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                color: poolSelected === "all" ? "#ffffff" : "#000000",
              }}
            >
              All
            </Typography>
          </Box>
        </div>
        <div onClick={() => setPoolSelected("puppy")}>
          <Box
            sx={{
              paddingX: "20px",
              paddingY: "8px",
              backgroundColor: poolSelected === "puppy" ? "#000000" : "#ffffff",
              borderRadius: "30px",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                color: poolSelected === "puppy" ? "#ffffff" : "#000000",
              }}
            >
              Puppy
            </Typography>
          </Box>
        </div>
        <div onClick={() => setPoolSelected("mar")}>
          <Box
            sx={{
              paddingX: "20px",
              paddingY: "8px",
              backgroundColor: poolSelected === "mar" ? "#000000" : "#ffffff",
              borderRadius: "30px",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                color: poolSelected === "mar" ? "#ffffff" : "#000000",
              }}
            >
              Mar
            </Typography>
          </Box>
        </div>
      </Stack>
    </Stack>
  );
};

export default PoolsSelection;
