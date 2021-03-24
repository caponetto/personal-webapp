import Typography from "@mui/material/Typography";
import React from "react";
import { PageHeader } from "./PageHeader";

interface MediaPageHeaderProps {
  type: "code" | "texts" | "talks";
  fadeTime: number;
}

export function MediaPageHeader(props: MediaPageHeaderProps) {
  return (
    <PageHeader fadeTime={props.fadeTime}>
      <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
        Here you can find some of my <strong>{props.type}</strong>
      </Typography>
    </PageHeader>
  );
}
