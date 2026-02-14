import Box from "@mui/material/Box";
import { ReactNode } from "react";
import { usePageActive } from "../../hooks/usePageActive";
import { PageNames } from "../../routes";
import { PageHeader } from "./PageHeader";

type PageProps = Readonly<{
  name: PageNames;
  headerContent?: ReactNode;
  headerSubtitle?: ReactNode;
  children: ReactNode;
}>;

export function Page(props: PageProps) {
  const active = usePageActive(0);

  return (
    <Box
      data-testid={`${props.name}-page`}
      sx={{
        width: 1,
        maxWidth: "1240px",
        mx: "auto",
        px: { xs: 2, sm: 3.5 },
        py: { xs: 2.5, sm: 4 },
        mb: { xs: 3, md: 4 },
      }}
    >
      {props.headerContent && <PageHeader title={props.headerContent} subtitle={props.headerSubtitle} />}
      {active && <Box sx={{ mt: props.headerContent ? { xs: 1, md: 1.5 } : 0 }}>{props.children}</Box>}
    </Box>
  );
}
