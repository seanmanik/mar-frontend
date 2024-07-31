import { Box, Stack, StackProps, Typography } from "@mui/joy";
import { memo } from "react";

export default memo<
  {
    text?: string;
    smallText?: string;
    smallTextColor?: string;
    name?: string;
    icon?: string;
    images?: string[];
    variant?: "medium" | "small";
    type?: "primary" | "secondary" | "tertiary" | string;
    isNameAbove?: boolean;
    align?: "left" | "right";
    nameIcon?: any;
    iconWidth?: number;

  } & StackProps
>(
  ({
    icon,
    text,
    smallText,
    smallTextColor,
    name,
    images,
    variant = "medium",
    type = "secondary",
    isNameAbove = false,
    align = "left",
    nameIcon,
    iconWidth = 40,
    ...stackProps
  }) => {
    const sizeImage = variant == "medium" ? "40px" : "25px";
    return (
      <Stack
        sx={{
          background:
            type == "primary" ? "linear-gradient(to right, #EAF1FF 20%, #D3CAFE 120%)"
            : type == "tertiary" ? "rgba(255, 247, 234, 1)"
            : type == 'secondary' ? "#F5F5F5"
            : type,
          padding: 1,
          borderRadius: 10,
        }}
        direction={align == "left" ? "row" : "row-reverse"}
        alignItems={"center"}
        justifyContent={"space-between"}
        {...stackProps}
      >
        <Stack
          direction={align == "left" ? "row" : "row-reverse"}
          alignItems={"center"}
          spacing={1}
        >
          {icon && (
            <Stack
              width={"40px"}
              height={"40px"}
              alignItems="center"
              justifyContent="center"
            >
              <img src={icon} width={iconWidth} />
            </Stack>
          )}
          <Stack
            direction={"column"}
            alignItems={align == "left" ? "flex-start" : "flex-end"}
          >
            {variant == "medium" && isNameAbove && align == "left" && name && (
              <Typography
                level="title-sm"
                fontSize={"12px"}
                color="neutral"
                fontWeight={700}
                display={"inline-flex"}
                alignItems={"center"}
              >
                {nameIcon}
                {name}
              </Typography>
            )}
            {variant == "medium" && isNameAbove && align == "right" && name && (
              <Typography
                level="title-sm"
                fontSize={"12px"}
                color="neutral"
                fontWeight={700}
                display={"inline-flex"}
                alignItems={"center"}
              >
                {name}
                {nameIcon}
              </Typography>
            )}
            {variant == "medium" && (
              <Typography display={"flex"} justifyContent={"space-between"} alignItems={"center"} level="title-lg">{text} {smallText&&<Typography level="title-md" color={smallTextColor as any} fontWeight={800}>{smallText}</Typography>}</Typography>
            )}
            {variant == "medium" && !isNameAbove && name && (
              <Typography level="title-sm" color="neutral">
                {name}
              </Typography>
            )}
            {variant == "small" && name && (
              <Typography level="title-lg">{name}</Typography>
            )}
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={align == "left" ? "flex-end" : "flex-start"}
        >
          {variant == "small" && text && (
            <Typography level="title-lg" textAlign={"left"}>{text} {smallText&&<Typography level="title-md" color={smallTextColor as any} fontWeight={800}>{smallText}</Typography>}</Typography>
          )}
          {images && images.length > 0 && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={align == "left" ? "flex-end" : "flex-start"}
              flexWrap={"wrap"}
            >
              {images.slice(0, 3).map((e, i) => (
                <img
                  key={i}
                  src={e}
                  width={sizeImage}
                  height={sizeImage}
                  style={{ objectFit: "cover", margin: 2, borderRadius: 5 }}
                />
              ))}
              {images.length > 3 && (
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ background: "white", borderRadius: 5, margin: "2px" }}
                  height={sizeImage}
                  width={sizeImage}
                >
                  <Typography fontSize={"10px"} fontWeight={700}>
                    +{images.length - 3}
                  </Typography>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  }
);
