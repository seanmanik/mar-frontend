import { Box, Grid, Stack, Typography } from "@mui/joy";
import React from "react";
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
        direction={"row"}
        maxWidth={1420}
        paddingLeft={"20px"}
        paddingRight={"20px"}
        height={166}
        alignItems={"center"}
        margin={"auto"}
        justifyContent={"space-between"}
      >
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          height="100%"
        >
          <div>
            <img src={ImageLogoFullBlue} width={140} />
            <Typography>Brand Tagline copy for impact</Typography>
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
          minWidth={"20%"}
          height="100%"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography fontWeight={500} width="50%">
              Contact Us
            </Typography>
            <Typography fontWeight={500} width="50%">
              Documentation
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography fontWeight={500} width="50%">
              Careers
            </Typography>
            <Typography fontWeight={500} width="50%">
              Help Center
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography fontWeight={500}>Blogs</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography fontWeight={500}>Terms & Privacy</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
