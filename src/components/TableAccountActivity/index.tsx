import { Box, Divider, Stack, Typography } from "@mui/joy";
import { memo, useEffect, useState } from "react";
import {
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import TokenToIcon from "../../utils/TokenToIcon";
import { useRecoilValue } from "recoil";
import { AuthTokenState } from "../../state/AuthTokenState";
import { getActivitiesRequest, IActivity } from "../../apis/getActivities";

export default memo(() => {
  const auth = useRecoilValue(AuthTokenState)
  const [activities, setActivities] = useState<IActivity[]>([])

  useEffect(() => {
    (async () => {
      if (auth) {
        const v = await getActivitiesRequest({token: auth})
        setActivities(v)
      }
    })()
  }, [auth])

  return (
    <Box>
      {activities.map((e, i) => (
        <Box key={i}>
          {i == 0 ? (
            <Typography color="neutral" fontSize={14} marginTop={0}>
              {new Date(e.activityDate).toLocaleDateString()}
            </Typography>
          ) : new Date(e.activityDate).toLocaleDateString() !=
            new Date(activities[i - 1].activityDate).toLocaleDateString() ? (
            <Typography color="neutral" fontSize={14} marginTop={2}>
              {new Date(e.activityDate).toLocaleDateString()}
            </Typography>
          ) : (
            <></>
          )}
          <Stack
            direction={"row"}
            marginBottom={2}
            marginTop={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"}>
              <img
                src={TokenToIcon[e.assetSymbol]}
                width={40}
                style={{ marginRight: 10 }}
              />
              <Box>
                <Typography level="title-sm" fontWeight={600}>
                  {e.type == "Withdraw" ? "Withdraw funds" : "Deposit funds"}
                </Typography>
                <Typography level="body-sm" color="neutral">
                  {e.assetSymbol}
                </Typography>
              </Box>
            </Stack>
            <Stack direction={"row"}>
              <Box>
                <Typography level="title-sm" fontWeight={600}>
                  {/* {e.stakeAmount.toLocaleString()} {e.symbol} */}
                  {e.tokenType == "ERC20"
                    ? `${e.quantity?.toLocaleString()} ${e.assetSymbol}`
                    : `${e.assetSymbol} ${e.nftIds?.map((v) => `#${v}`).join(", ")}`}
                </Typography>
                <Typography level="body-sm" color="neutral" textAlign={"right"}>
                  {e.type == "Withdraw" ? "-" : "+"}$
                  {(e.quantity * e.tokenPrice).toLocaleString()}
                </Typography>
              </Box>
              {e.type == "Withdraw" ? (
                <KeyboardDoubleArrowDown sx={{color: 'red'}} />
              ) : (
                <KeyboardDoubleArrowUp sx={{color: 'green'}} />
              )}
            </Stack>
          </Stack>
          {i < activities.length - 1 &&
            new Date(e.activityDate).toLocaleDateString() ==
              new Date(activities[i + 1].activityDate).toLocaleDateString() && (
              <Divider />
            )}
        </Box>
      ))}
    </Box>
  );
});
