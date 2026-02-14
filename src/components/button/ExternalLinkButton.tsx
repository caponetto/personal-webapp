import LaunchIcon from "@mui/icons-material/Launch";
import { ButtonProps } from "@mui/material";
import Button from "@mui/material/Button";
import { MouseEventHandler } from "react";
import { EXTERNAL_LINK_PROPS } from "../../utils/externalLink";

type ExternalLinkButtonProps = Readonly<{
  title: string;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  variant?: ButtonProps["variant"];
}>;

export function ExternalLinkButton(props: ExternalLinkButtonProps) {
  return (
    <Button
      sx={{
        minWidth: 0,
        px: 1,
        textTransform: "none",
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "success.main",
          outlineOffset: 2,
        },
      }}
      variant={props.variant ?? "text"}
      size="small"
      endIcon={<LaunchIcon />}
      color="success"
      component="a"
      href={props.href}
      onClick={props.onClick}
      {...EXTERNAL_LINK_PROPS}
    >
      {props.title}
    </Button>
  );
}
