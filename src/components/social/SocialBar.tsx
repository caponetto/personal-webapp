import Grid from "@mui/material/Grid";
import { SxProps, Theme } from "@mui/system";
import React from "react";
import { openExternalUrl } from "../../window";
import { GitHubButton, LinkedInButton, TwitterButton } from "../button";

interface SocialBarProps {
  sx?: SxProps<Theme>;
  urls: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export function SocialBar(props: SocialBarProps) {
  return (
    <Grid container sx={props.sx}>
      <Grid item xs>
        <GitHubButton onClick={() => openExternalUrl(props.urls.github)} />
      </Grid>
      <Grid item xs>
        <TwitterButton onClick={() => openExternalUrl(props.urls.twitter)} />
      </Grid>
      <Grid item xs>
        <LinkedInButton onClick={() => openExternalUrl(props.urls.linkedin)} />
      </Grid>
    </Grid>
  );
}
