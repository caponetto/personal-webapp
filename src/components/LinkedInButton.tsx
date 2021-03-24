import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";
import { routes } from "../common/Routes";
import { SocialButton } from "./SocialButton";

export function LinkedInButton() {
  return (
    <SocialButton
      label="LinkedIn"
      icon={<LinkedInIcon />}
      onClick={() => window.open(routes.urls.linkedin, "_blank")}
    />
  );
}
