import Box from "@mui/material/Box";
import React from "react";

interface PageProps {
  children: React.ReactNode;
}

export function Page(props: PageProps) {
  return <Box sx={{ pb: "10px" }}>{props.children}</Box>;
}
