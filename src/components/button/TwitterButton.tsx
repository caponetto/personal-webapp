import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import { SocialButton } from "./SocialButton";

interface TwitterButtonProps {
  disableSpacing?: boolean;
  onClick: () => void;
}

export function TwitterButton(props: TwitterButtonProps) {
  return (
    <SocialButton
      label="Twitter"
      icon={<TwitterIcon />}
      disableSpacing={props.disableSpacing}
      onClick={props.onClick}
    />
  );
}
