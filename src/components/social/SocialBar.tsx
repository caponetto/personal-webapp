import Grid from "@mui/material/Grid";
import { SxProps, Theme } from "@mui/system";
import { GitHubButton, LinkedInButton, XButton } from "../button";

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
        <GitHubButton url={props.urls.github} />
      </Grid>
      <Grid item xs>
        <XButton url={props.urls.twitter} />
      </Grid>
      <Grid item xs>
        <LinkedInButton url={props.urls.linkedin} />
      </Grid>
    </Grid>
  );
}
