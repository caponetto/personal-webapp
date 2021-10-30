import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import { routes } from "../common/Routes";
import { SocialButton } from "./SocialButton";

interface TwitterButtonProps {
  disableSpacing?: boolean;
}

export function TwitterButton(props: TwitterButtonProps) {
  return (
    <SocialButton
      label="Twitter"
      icon={<TwitterIcon />}
      disableSpacing={props.disableSpacing}
      onClick={() => window.open(routes.urls.twitter, "_blank")}
    />
  );
}
