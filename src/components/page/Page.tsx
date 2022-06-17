import Box from "@mui/material/Box";
import { ReactNode } from "react";
import { PageNames } from "../../routes";

interface PageProps {
  name: PageNames;
  children: ReactNode;
}

export function Page(props: PageProps) {
  return (
    <Box data-testid={`${props.name}-page`} sx={{ p: "16px 24px", mb: "24px" }}>
      {props.children}
    </Box>
  );
}
