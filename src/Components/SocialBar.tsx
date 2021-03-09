import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import React, { ReactNode, useCallback } from "react";
import { routes } from "../Common/Routes";

export function SocialBar() {
  const openLinkInNewWindow = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  return (
    <Grid container sx={{ width: "70%", mx: "auto", mb: "10px" }}>
      <Grid item xs>
        <SocialItem icon={<GitHubIcon />} onClick={() => openLinkInNewWindow(routes.urls.github)} />
      </Grid>
      <Grid item xs>
        <SocialItem icon={<TwitterIcon />} onClick={() => openLinkInNewWindow(routes.urls.twitter)} />
      </Grid>
      <Grid item xs>
        <SocialItem icon={<LinkedInIcon />} onClick={() => openLinkInNewWindow(routes.urls.linkedin)} />
      </Grid>
    </Grid>
  );
}

interface SocialItemProps {
  icon: ReactNode;
  onClick: () => void;
}

function SocialItem(props: SocialItemProps) {
  return (
    <Box display="flex" justifyContent="center">
      <IconButton onClick={props.onClick}>{props.icon}</IconButton>
    </Box>
  );
}
