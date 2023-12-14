import { Button } from '@mui/material'
import React, {CSSProperties, MouseEventHandler, ReactNode} from 'react'

interface ButtonWithIconProps {
  icon: ReactNode;
  label: string;
  bgColor?: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  sx?: CSSProperties;
}

const ButtonWithIcon = ({
    icon,
    label,
    bgColor,
    disabled,
    onClick,
    sx
}: ButtonWithIconProps) => {
  return (
    <Button 
        disabled = {disabled}
        style={{
            backgroundColor: bgColor, 
            color: disabled ? "" : "white",
            display: "flex",
            gap: "8px",
            padding: "8px 16px",
            height: "40px",
            ...sx
        }}
         onClick={onClick} 
        >
        {icon}
        {label}
    </Button>
  )
}

export default ButtonWithIcon
