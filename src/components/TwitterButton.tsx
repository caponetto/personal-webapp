import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import { routes } from "../common/Routes";
import { SocialButton } from "./SocialButton";

export function TwitterButton() {
  return (
    <SocialButton label="Twitter" icon={<TwitterIcon />} onClick={() => window.open(routes.urls.twitter, "_blank")} />
  );
}
