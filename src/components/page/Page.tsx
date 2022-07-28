import Box from "@mui/material/Box";
import { ReactNode } from "react";
import { usePageActive } from "../../hooks/usePageActive";
import { PageNames } from "../../routes";
import { PageHeader } from "./PageHeader";

interface PageProps {
  name: PageNames;
  headerContent?: ReactNode;
  children: ReactNode;
}

export function Page(props: PageProps) {
  const active = usePageActive(0);

  return (
    <Box data-testid={`${props.name}-page`} sx={{ p: "16px 24px", mb: "24px" }}>
      {props.headerContent && <PageHeader>{props.headerContent}</PageHeader>}
      {active && props.children}
    </Box>
  );
}
