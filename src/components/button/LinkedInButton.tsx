import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";
import { useTranslation } from "react-i18next";
import { SocialButton } from "./SocialButton";

interface LinkedInButtonProps {
  disableSpacing?: boolean;
  onClick: () => void;
}

export function LinkedInButton(props: LinkedInButtonProps) {
  const { t } = useTranslation();
  return (
    <SocialButton
      label={t("literal:linkedin")}
      icon={<LinkedInIcon />}
      disableSpacing={props.disableSpacing}
      onClick={props.onClick}
    />
  );
}
