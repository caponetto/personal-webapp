import { Badge, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import React from "react";
import { useTranslation } from "react-i18next";

interface FaceBadgeProps {
  name: string;
  avatarRoute: string;
  location: { name: string; url: string; emojiIcon: string };
  onClick?: () => void;
}

export function FaceBadge(props: FaceBadgeProps) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        my: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Tooltip title={t("common:location.tooltip", { location: props.location.name }).toString()} arrow>
            <Link underline="none" rel="noreferrer" target="_blank" href={props.location.url}>
              <IconButton id="face-badge-location" sx={{ color: "rgba(0,0,0,0.9)" }}>
                {props.location.emojiIcon}
              </IconButton>
            </Link>
          </Tooltip>
        }
      >
        <IconButton id="face-badge" onClick={props.onClick}>
          <Avatar alt={props.name} src={props.avatarRoute} sx={{ width: 150, height: 150, boxShadow: 3 }} />
        </IconButton>
      </Badge>
    </Box>
  );
}
