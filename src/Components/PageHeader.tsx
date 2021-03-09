import Typography from "@mui/material/Typography";
import React from "react";

interface PageHeaderProps {
  content: string;
}

export function PageHeader(props: PageHeaderProps) {
  return <Typography sx={{ mb: "30px", fontSize: "18px" }}>{props.content}</Typography>;
}
