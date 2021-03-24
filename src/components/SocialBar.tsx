import Grid from "@mui/material/Grid";
import { SxProps, Theme } from "@mui/system";
import React from "react";
import { GitHubButton } from "./GitHubButton";
import { LinkedInButton } from "./LinkedInButton";
import { TwitterButton } from "./TwitterButton";

interface SocialBarProps {
  sx?: SxProps<Theme>;
}

export function SocialBar(props: SocialBarProps) {
  return (
    <Grid container sx={props.sx}>
      <Grid item xs>
        <GitHubButton />
      </Grid>
      <Grid item xs>
        <TwitterButton />
      </Grid>
      <Grid item xs>
        <LinkedInButton />
      </Grid>
    </Grid>
  );
}
