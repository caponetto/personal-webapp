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
      <Grid size="grow">
        <GitHubButton url={props.urls.github} />
      </Grid>
      <Grid size="grow">
        <XButton url={props.urls.twitter} />
      </Grid>
      <Grid size="grow">
        <LinkedInButton url={props.urls.linkedin} />
      </Grid>
    </Grid>
  );
}
