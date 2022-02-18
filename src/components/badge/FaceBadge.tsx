import { Badge, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { openExternalUrl } from "../../window";

interface FaceBadgeProps {
  name: string;
  avatarRoute: string;
  location: { name: string; url: string; emojiIcon: string };
  onClick?: () => void;
}

export function FaceBadge(props: FaceBadgeProps) {
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
          <Tooltip title={`Currently based on ${props.location.name}`} arrow>
            <IconButton
              id="face-badge-location"
              sx={{ color: "rgba(0,0,0,0.9)" }}
              onClick={() => openExternalUrl(props.location.url)}
            >
              {props.location.emojiIcon}
            </IconButton>
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
