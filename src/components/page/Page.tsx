import Box from "@mui/material/Box";
import React from "react";

interface PageProps {
  children: React.ReactNode;
}

export function Page(props: PageProps) {
  return <Box sx={{ p: "16px 24px", mb: "24px" }}>{props.children}</Box>;
}
