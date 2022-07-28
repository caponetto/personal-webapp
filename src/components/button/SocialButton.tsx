import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "../link";

interface SocialButtonProps {
  label: string;
  icon: ReactNode;
  url: string;
  disableSpacing?: boolean;
}

export function SocialButton(props: SocialButtonProps) {
  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="center">
      <ExternalLink href={props.url}>
        <Tooltip title={t("common:social.tooltip", { kind: props.label }).toString()} arrow>
          <IconButton
            id={`${props.label}-button`}
            data-testid={`${props.label}-button`}
            sx={{ p: props.disableSpacing ? "0" : "8px" }}
            aria-label={`Open ${props.label}`}
          >
            {props.icon}
          </IconButton>
        </Tooltip>
      </ExternalLink>
    </Box>
  );
}
