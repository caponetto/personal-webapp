import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { ReactNode } from "react";

interface PageHeaderProps {
  fadeTime: number;
  children: ReactNode;
}

export function PageHeader(props: PageHeaderProps) {
  return (
    <Fade in={true} timeout={props.fadeTime}>
      <Box>{props.children}</Box>
    </Fade>
  );
}
