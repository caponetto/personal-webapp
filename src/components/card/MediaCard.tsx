import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { Media } from "../../data";
import { Fonts } from "../../fonts";
import { routes } from "../../routes";
import { openExternalUrl } from "../../window";
import { HoverableCard } from "./HoverableCard";

interface MediaCardProps {
  item: Media;
  selectedKeywords: string[];
  onKeywordClicked: (keyword: string) => void;
}

export function MediaCard(props: MediaCardProps) {
  const app = useApp();
  const { t } = useTranslation();

  const accessMediaButtonLabel = useMemo(() => {
    if (["post", "thesis"].includes(props.item.type)) {
      return t("literal:read");
    }

    if (props.item.type === "live") {
      return t("literal:watch");
    }

    if (props.item.type === "conference") {
      return t("literal:slides");
    }

    return t("literal:view");
  }, [props.item.type, t]);

  const formattedMediaDate = useMemo(() => {
    if (["code", "thesis"].includes(props.item.type)) {
      return format(props.item.releaseDate, "yyyy");
    }

    return format(props.item.releaseDate, "MMM dd, yyyy");
  }, [props.item.releaseDate, props.item.type]);

  const iconRoute = useMemo(() => {
    if (props.item.publishedAt === "KIE Community") {
      return routes.images.kie;
    }

    if (props.item.publishedAt === "Towards Data Science") {
      return routes.images.tds;
    }

    if (props.item.publishedAt === "UNICAMP") {
      return app.colorMode === "light" ? routes.images.unicamp.light : routes.images.unicamp.dark;
    }

    if (props.item.publishedAt === "The Developer's Conference") {
      return routes.images.tdc;
    }

    if (props.item.publishedAt === "GitHub") {
      return app.colorMode === "light" ? routes.images.github.light : routes.images.github.dark;
    }
  }, [app.colorMode, props.item.publishedAt]);

  return (
    <HoverableCard>
      <CardHeader
        title={
          <Typography
            sx={{
              fontFamily: Fonts.OXYGEN,
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "bold",
              height: { xs: "auto", lg: "50px" },
            }}
            color={grey[app.colorMode === "light" ? 700 : 500]}
            gutterBottom
          >
            {props.item.title}
          </Typography>
        }
        action={
          iconRoute && (
            <Tooltip title={props.item.publishedAt} arrow>
              <img
                style={{ margin: "4px 8px 0px 16px", width: "20px", height: "20px" }}
                src={iconRoute}
                alt={""}
                loading="lazy"
              />
            </Tooltip>
          )
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Grid sx={{ height: { xs: "auto", lg: "50px" } }} container spacing={1}>
          {[...props.item.keywordKeys]
            .sort((a, b) => b.length - a.length)
            .map((keywordKey) => (
              <Grid item key={`media-keyword-${keywordKey}`}>
                <Chip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  label={t(`literal:${keywordKey}` as any)}
                  color="success"
                  variant={props.selectedKeywords.includes(keywordKey) ? "filled" : "outlined"}
                  size="small"
                  onClick={() => props.onKeywordClicked(keywordKey)}
                />
              </Grid>
            ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ pt: 0, px: "16px" }}>
        <Box sx={{ width: 1 }}>
          <Typography sx={{ fontSize: 13, float: "left", lineHeight: "30px" }} color="text.secondary" component="div">
            {formattedMediaDate}
          </Typography>
          {props.item.url && (
            <Button
              sx={{ float: "right" }}
              size="small"
              endIcon={<LaunchIcon />}
              color="success"
              onClick={() => props.item.url && openExternalUrl(props.item.url)}
            >
              {accessMediaButtonLabel}
            </Button>
          )}
        </Box>
      </CardActions>
    </HoverableCard>
  );
}
