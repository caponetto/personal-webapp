import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { ReactNode } from "react";

const DEFAULT_FADE_TIME = 500;

interface PageHeaderProps {
  fadeTime?: number;
  children: ReactNode;
}

export function PageHeader(props: PageHeaderProps) {
  return (
    <Fade in={true} timeout={props.fadeTime ?? DEFAULT_FADE_TIME}>
      <Box>{props.children}</Box>
    </Fade>
  );
}
