import Link, { LinkProps } from "@mui/material/Link";
import { ReactNode } from "react";

interface ExternalLinkProps {
  children: ReactNode;
}

export function ExternalLink(props: ExternalLinkProps & Partial<LinkProps>) {
  return (
    <Link
      underline={props.underline ?? "none"}
      rel="noreferrer"
      target="_blank"
      href={props.href}
      variant={props.variant}
      color={props.color}
    >
      {props.children}
    </Link>
  );
}
