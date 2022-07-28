import { Badge, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "../link";

interface FaceBadgeProps {
  name: string;
  imageSource: string;
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
          <ExternalLink href={props.location.url}>
            <Tooltip title={t("common:location.tooltip", { location: props.location.name }).toString()} arrow>
              <IconButton sx={{ color: "rgba(0,0,0,0.9)" }}>{props.location.emojiIcon}</IconButton>
            </Tooltip>
          </ExternalLink>
        }
      >
        <IconButton data-testid="face-badge" onClick={props.onClick}>
          <Avatar alt={props.name} src={props.imageSource} sx={{ width: 150, height: 150, boxShadow: 3 }} />
        </IconButton>
      </Badge>
    </Box>
  );
}
