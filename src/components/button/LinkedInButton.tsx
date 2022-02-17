import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";
import { SocialButton } from "./SocialButton";

interface LinkedInButtonProps {
  disableSpacing?: boolean;
  onClick: () => void;
}

export function LinkedInButton(props: LinkedInButtonProps) {
  return (
    <SocialButton
      label="LinkedIn"
      icon={<LinkedInIcon />}
      disableSpacing={props.disableSpacing}
      onClick={props.onClick}
    />
  );
}
