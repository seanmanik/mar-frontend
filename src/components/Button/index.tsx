import { Button as JoyButton, ButtonProps, Stack, Typography } from "@mui/joy";
import React from "react";

export interface IButtonProps extends ButtonProps {
    buttonType: 'primary' | 'secondary'
}

const Button = ({ buttonType, children, endDecorator, ...props }: IButtonProps) => {
    if (buttonType === 'secondary') {
        return <JoyButton
            {...props}
            variant="outlined"
            sx={{
                paddingX: '20px',
                paddingY: '12px',
                borderRadius: '12px'
            }}
        >
            <Stack direction='row' width="100%" alignItems="center" justifyContent="space-between" gap={1}>
                <Typography fontWeight={500} fontSize={16} textColor="#000000">{children}</Typography>
                {endDecorator}
            </Stack>
        </JoyButton>
    }

    return <JoyButton
        {...props}
        variant="solid"
        sx={{
            paddingX: '20px',
            paddingY: '12px',
            borderRadius: '12px',
            backgroundColor: '#000000'
        }}
    >
        <Stack direction='row' width="100%" alignItems="center" justifyContent="space-between" gap={1}>
            <Typography fontWeight={500} fontSize={16} textColor="#ffffff">{children}</Typography>
            {endDecorator}
        </Stack>
    </JoyButton>
}

export default Button