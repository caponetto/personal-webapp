import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import { routes } from "../common/Routes";
import { SocialButton } from "./SocialButton";

interface GitHubButtonProps {
  disableSpacing?: boolean;
}

export function GitHubButton(props: GitHubButtonProps) {
  return (
    <SocialButton
      label="GitHub"
      icon={<GitHubIcon />}
      disableSpacing={props.disableSpacing}
      onClick={() => window.open(routes.urls.github, "_blank")}
    />
  );
}
