import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

const DEFAULT_FADE_TIME = 500;

interface PageHeaderProps {
  fadeTime?: number;
  children: ReactNode;
}

export function PageHeader(props: PageHeaderProps) {
  return (
    <Fade in={true} timeout={props.fadeTime ?? DEFAULT_FADE_TIME}>
      <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
        {props.children}
      </Typography>
    </Fade>
  );
}
