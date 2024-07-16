import { memo, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Avatar, AvatarGroup, Box, Grid, Stack, Typography } from "@mui/joy";
import TokenAmountDisplay from "../TokenAmountDisplay";
import {
  IconMarPoint,
  IconMyStake,
  IconTotalValueStake,
} from "../../icons";
import { Bolt } from "@mui/icons-material";
import { ImageLogoBlueCircle } from "../../images";
import TokenToIcon from "../../utils/TokenToIcon";
import NFTDisplay from "../NFTDisplay";
import InputNFT from "../InputNFT";
import ValueDisplay from "../ValueDisplay";
import Button from "../Button";

export default memo<{
  open: boolean;
  symbol: string;
  nftIds: {
    id: number;
    image: string;
  }[];
  marPoint: number;
  puppyPoint: number;
  totalValue: number;
  stakeAmount: number;
  pendingValue: number;
  isSuccess: boolean;

  openseaLink?: string;
  blurLink?: string;
  onClose: () => void;
  onDeposit: (value: number[]) => void;
}>(
  ({
    open,
    symbol,
    nftIds,
    marPoint,
    puppyPoint,
    totalValue,
    stakeAmount,
    isSuccess,
    openseaLink,
    blurLink,
    onClose,
    onDeposit,
  }) => {
    const [value, setValue] = useState<number[]>([]);
    return (
      <ModalBlue
        open={open}
        onClose={onClose}
        title={
          isSuccess
            ? `NFT Deposited
            Successfully`
            : `Deposit your NFT
            to earn points`
        }
      >
        <Box maxWidth={550}>
          {!isSuccess && (
            <>
              <Box maxWidth={"100%"} overflow={"hidden"}>
                <InputNFT
                  title={`Deposit ${symbol}`}
                  symbol={symbol}
                  onChange={(v) => setValue(v)}
                  value={value}
                  nftIds={nftIds}
                  blurLink={blurLink}
                  openseaLink={openseaLink}
                />
              </Box>
              <Grid marginTop={4} container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={12} paddingBottom={-2}>
                  <Typography level="title-sm">My Rewards</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <TokenAmountDisplay
                    amount={marPoint}
                    name="Mar points"
                    icon={IconMarPoint}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  {/* <Typography level="title-sm">&nbsp;</Typography> */}
                  <TokenAmountDisplay
                    amount={puppyPoint}
                    name="Puppy points"
                    icon={IconMarPoint}
                  />
                </Grid>

                <Grid xs={12} sm={6}>
                  <Typography level="title-sm" paddingBottom={1}>
                    Total Value Staked
                  </Typography>
                  <TokenAmountDisplay
                    amount={totalValue}
                    name="USD"
                    icon={IconTotalValueStake}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography level="title-sm" paddingBottom={1}>
                    My Staked
                  </Typography>
                  <TokenAmountDisplay
                    amount={stakeAmount}
                    name="USDC"
                    icon={IconMyStake}
                  />
                </Grid>

                {/* <Grid xs={12} paddingBottom={-2}>
                  <Typography level="title-sm">Pending Deposits</Typography>
                </Grid>
                <Grid xs={12} sm={12}>
                  <TokenAmountDisplay amount={pendingValue} symbol={symbol} name="in processing" icon={IconPending}/>
                  <ValueDisplay
                    icon={TokenToIcon[symbol]}
                    text={`${symbol} #123`}
                    name="in processing"
                    images={[
                      "https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk?auto=format&dpr=1&w=1000",
                    ]}
                  />
                </Grid> */}
              </Grid>
              <Button
                sx={{
                  marginTop: 5,
                }}
                buttonType="primary"
                justifyContentChild="center"
                endDecorator={<Bolt />}
                fullWidth
                disabled={value.length == 0}
                onClick={() => onDeposit && onDeposit(value)}
              >
                Deposit
              </Button>
            </>
          )}

          {isSuccess && (
            <>
              <Stack alignItems={"center"} paddingTop={5} paddingBottom={5}>
                <AvatarGroup>
                  <Avatar src={ImageLogoBlueCircle} />
                  <Avatar src={TokenToIcon[symbol]} />
                </AvatarGroup>
                <Typography
                  fontSize={32}
                  lineHeight={"34px"}
                  fontWeight={500}
                  textAlign={"center"}
                >
                  Congrats, you are earning
                  <br />
                  like a pro!
                </Typography>
              </Stack>
              <Typography level="title-sm" marginBottom={1}>
                NFT Deposit
              </Typography>
              <NFTDisplay
                symbol={symbol}
                icon={TokenToIcon[symbol]}
                nftIds={nftIds.filter((e) => value.includes(e.id))}
              />
              <Button
                sx={{
                  marginTop: 5,
                }}
                buttonType="secondary"
                justifyContentChild="center"
                fullWidth
                onClick={() => window.open("https://etherscan.io")}
              >
                View on Explorer
              </Button>
            </>
          )}
        </Box>
      </ModalBlue>
    );
  }
);
