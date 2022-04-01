import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import { useTranslation } from "react-i18next";
import { SocialButton } from "./SocialButton";

interface GitHubButtonProps {
  disableSpacing?: boolean;
  onClick: () => void;
}

export function GitHubButton(props: GitHubButtonProps) {
  const { t } = useTranslation();
  return (
    <SocialButton
      label={t("literal:github")}
      icon={<GitHubIcon />}
      disableSpacing={props.disableSpacing}
      onClick={props.onClick}
    />
  );
}
