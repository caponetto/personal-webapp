import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ScaleWhileHover } from "../motion";

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
      <Tooltip title={t("common:social.tooltip", { kind: props.label }).toString()} arrow>
        <Link underline="none" rel="noreferrer" target="_blank" href={props.url}>
          <ScaleWhileHover scale={1.05}>
            <IconButton
              id={`${props.label}-button`}
              data-testid={`${props.label}-button`}
              sx={{ p: props.disableSpacing ? "0" : "8px" }}
              aria-label={`Open ${props.label}`}
            >
              {props.icon}
            </IconButton>
          </ScaleWhileHover>
        </Link>
      </Tooltip>
    </Box>
  );
}
