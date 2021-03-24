import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React, { ReactNode } from "react";

interface SocialButtonProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

export function SocialButton(props: SocialButtonProps) {
  return (
    <Box display="flex" justifyContent="center">
      <Tooltip title={`${props.label} Profile`} arrow>
        <IconButton id={`${props.label}-button`} aria-label={`Open ${props.label}`} onClick={props.onClick}>
          {props.icon}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
