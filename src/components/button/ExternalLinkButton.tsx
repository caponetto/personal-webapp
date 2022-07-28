import LaunchIcon from "@mui/icons-material/Launch";
import Button from "@mui/material/Button";
import { ExternalLink } from "../link";

interface ExternalLinkButtonProps {
  title: string;
  href: string;
}

export function ExternalLinkButton(props: ExternalLinkButtonProps) {
  return (
    <ExternalLink href={props.href}>
      <Button sx={{ float: "right" }} size="small" endIcon={<LaunchIcon />} color="success">
        {props.title}
      </Button>
    </ExternalLink>
  );
}
