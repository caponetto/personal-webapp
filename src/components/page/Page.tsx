import Box from "@mui/material/Box";
import React from "react";
import { PageNames } from "../../routes";

interface PageProps {
  name: PageNames;
  children: React.ReactNode;
}

export function Page(props: PageProps) {
  return (
    <Box data-testid={`${props.name}-page`} sx={{ p: "16px 24px", mb: "24px" }}>
      {props.children}
    </Box>
  );
}
