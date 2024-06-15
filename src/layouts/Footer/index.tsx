import { Box, Stack, Typography } from "@mui/joy";
import { ImageLogoFullBlue } from "../../images";
import {
  IconDiscord,
  IconGithub,
  IconLanguage,
  IconTele,
  IconTwitter,
} from "../../icons";

const Footer = () => {
  return (
    <Box bgcolor={"white"} width="100%" paddingY={"42px"}>
      <Stack
        direction={{
          md: "row",
          sm: "column",
          xs: "column",
        }}
        maxWidth={1420}
        paddingLeft={"20px"}
        paddingRight={"20px"}
        height={166}
        alignItems={{
          md: "center",
          sm: "space-between",
          xs: "space-between",
        }}
        margin={"auto"}
        justifyContent={{
          md: "space-between",
          sm: "center",
          xs: "center",
        }}
        gap={1}
      >
        <Stack
          direction={{
            md: "column",
            sm: "row",
            xs: "row",
          }}
          alignItems="flex-start"
          justifyContent="space-between"
          height="100%"
        >
          <div>
            <img src={ImageLogoFullBlue} width={140} />
            <Typography
              // display={{
              //   md: "block",
              //   sm: "none",
              //   xs: "none",
              // }}
            >
              Brand Tagline copy for impact
            </Typography>
          </div>
          <Stack direction="row" alignItems="center" gap={"20px"}>
            <img src={IconLanguage} width={24} height={24} />
            <img src={IconTwitter} width={24} height={24} />
            <img src={IconDiscord} width={24} height={24} />
            <img src={IconGithub} width={24} height={24} />
            <img src={IconTele} width={24} height={24} />
          </Stack>
        </Stack>

        <Stack
          direction="column"
          width={{
            md: "60%",
            sm: "100%",
            xs: "100%",
          }}
          height="100%"
          justifyContent="space-between"
          display="flex"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{
              md: "flex-end",
              sm: "space-between",
              xs: "space-between",
            }}
            width="100%"
          >
            <Typography fontWeight={500} width="115px" textAlign="start">
              Contact Us
            </Typography>
            <Typography fontWeight={500} width="115px" textAlign="start">
              Documentation
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{
              md: "flex-end",
              sm: "space-between",
              xs: "space-between",
            }}
            width="100%"
          >
            <Typography fontWeight={500} width="115px" textAlign="start">
              Careers
            </Typography>
            <Typography fontWeight={500} width="115px" textAlign="start">
              Help Center
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{
              md: "flex-end",
              sm: "space-between",
              xs: "space-between",
            }}
            width="100%"
          >
            <Typography fontWeight={500} textAlign="start" width="115px">
              Blogs
            </Typography>
            <Typography
              fontWeight={500}
              textAlign="start"
              width="115px"
            ></Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{
              md: "flex-end",
              sm: "space-between",
              xs: "space-between",
            }}
            width="100%"
          >
            <Typography fontWeight={500} textAlign="start" width="115px">
              Terms & Privacy
            </Typography>
            <Typography
              fontWeight={500}
              textAlign="start"
              width="115px"
            ></Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
