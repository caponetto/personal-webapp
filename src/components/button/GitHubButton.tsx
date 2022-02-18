import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import { SocialButton } from "./SocialButton";

interface GitHubButtonProps {
  disableSpacing?: boolean;
  onClick: () => void;
}

export function GitHubButton(props: GitHubButtonProps) {
  return (
    <SocialButton label="GitHub" icon={<GitHubIcon />} disableSpacing={props.disableSpacing} onClick={props.onClick} />
  );
}
