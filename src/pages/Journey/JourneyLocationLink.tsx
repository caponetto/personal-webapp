import Link from "@mui/material/Link";
import { EXTERNAL_LINK_PROPS } from "../../utils/externalLink";

type JourneyLocationLinkProps = Readonly<{
  name: string;
  url?: string;
  variant?: "inherit" | "overline";
}>;

export function JourneyLocationLink(props: JourneyLocationLinkProps) {
  if (!props.url) {
    return <>{props.name}</>;
  }

  return (
    <Link
      color="primary"
      underline="hover"
      variant={props.variant ?? "overline"}
      href={props.url}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.45,
        "&:hover": {
          textDecorationThickness: "2px",
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 2,
          borderRadius: 0.4,
          textDecoration: "underline",
        },
      }}
      {...EXTERNAL_LINK_PROPS}
    >
      {props.name}
    </Link>
  );
}
