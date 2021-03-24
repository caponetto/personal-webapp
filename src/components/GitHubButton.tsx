import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import { routes } from "../common/Routes";
import { SocialButton } from "./SocialButton";

export function GitHubButton() {
  return (
    <SocialButton label="GitHub" icon={<GitHubIcon />} onClick={() => window.open(routes.urls.github, "_blank")} />
  );
}
