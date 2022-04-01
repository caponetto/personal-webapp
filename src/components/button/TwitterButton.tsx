import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import { useTranslation } from "react-i18next";
import { SocialButton } from "./SocialButton";

interface TwitterButtonProps {
  disableSpacing?: boolean;
  onClick: () => void;
}

export function TwitterButton(props: TwitterButtonProps) {
  const { t } = useTranslation();
  return (
    <SocialButton
      label={t("literal:twitter")}
      icon={<TwitterIcon />}
      disableSpacing={props.disableSpacing}
      onClick={props.onClick}
    />
  );
}
