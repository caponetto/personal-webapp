import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { EXTERNAL_LINK_PROPS } from "../../utils/externalLink";

type SocialButtonProps = Readonly<{
  label: string;
  icon: ReactNode;
  url: string;
  disableSpacing?: boolean;
}>;

export function SocialButton(props: SocialButtonProps) {
  const { t } = useTranslation();
  const tooltipLabel: string = t("common:social.tooltip", { kind: props.label });

  return (
    <Box display="flex" justifyContent="center">
      <Tooltip title={tooltipLabel} arrow>
        <IconButton
          sx={{
            p: props.disableSpacing ? "0" : "8px",
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "success.main",
              outlineOffset: 2,
            },
          }}
          aria-label={`Open ${props.label}`}
          component="a"
          href={props.url}
          {...EXTERNAL_LINK_PROPS}
        >
          {props.icon}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
