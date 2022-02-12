import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";
import { routes } from "../common/Routes";
import { SocialButton } from "./SocialButton";

interface LinkedInButtonProps {
  disableSpacing?: boolean;
}

export function LinkedInButton(props: LinkedInButtonProps) {
  return (
    <SocialButton
      label="LinkedIn"
      icon={<LinkedInIcon />}
      disableSpacing={props.disableSpacing}
      onClick={() => window.open(routes.urls.linkedin, "_blank", "noopener")}
    />
  );
}
