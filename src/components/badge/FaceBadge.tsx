import { Badge, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import { EXTERNAL_LINK_PROPS } from "../../utils/externalLink";

type FaceBadgeProps = Readonly<{
  name: string;
  imageSource: string;
  location: { name: string; url: string; emojiIcon: string };
  onClick?: () => void;
}>;

export function FaceBadge(props: FaceBadgeProps) {
  const { t } = useTranslation();
  const locationLabel = t("common:location.tooltip", { location: props.location.name }).toString();
  const isClickable = typeof props.onClick === "function";

  return (
    <Box
      sx={{
        display: "flex",
        mt: 1.5,
        mb: 2.5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Tooltip title={locationLabel} arrow>
            <IconButton
              size="small"
              sx={{
                color: "rgba(0,0,0,0.9)",
                p: 0.28,
                fontSize: "1.44rem",
              }}
              aria-label={locationLabel}
              component="a"
              href={props.location.url}
              {...EXTERNAL_LINK_PROPS}
            >
              {props.location.emojiIcon}
            </IconButton>
          </Tooltip>
        }
      >
        <IconButton
          data-testid="face-badge"
          onClick={props.onClick}
          disableRipple={!isClickable}
          sx={{
            p: 0.2,
            borderRadius: "50%",
            transition: "transform 160ms ease",
            ...(isClickable && {
              "&:hover": {
                transform: "scale(1.01)",
              },
            }),
          }}
        >
          <Avatar
            alt={props.name}
            src={props.imageSource}
            slotProps={{
              img: {
                loading: "eager",
                fetchPriority: "high",
                decoding: "async",
              },
            }}
            sx={{
              width: 150,
              height: 150,
              border: "2px solid",
              borderColor: "rgba(255,255,255,0.9)",
              boxShadow: "0 4px 14px rgba(15,23,42,0.14)",
            }}
          />
        </IconButton>
      </Badge>
    </Box>
  );
}
