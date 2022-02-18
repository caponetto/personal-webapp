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
import { useApp } from "../../context/AppContext";
import { Media } from "../../data/Data";
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

  const accessMediaButtonLabel = useMemo(() => {
    if (["post", "thesis"].includes(props.item.type)) {
      return "Read";
    }

    if (props.item.type === "live") {
      return "Watch";
    }

    if (props.item.type === "conference") {
      return "Slides";
    }

    return "View";
  }, [props.item.type]);

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
      return app.isLight ? routes.images.unicamp.light : routes.images.unicamp.dark;
    }

    if (props.item.publishedAt === "The Developer's Conference") {
      return routes.images.tdc;
    }

    if (props.item.publishedAt === "GitHub") {
      return app.isLight ? routes.images.github.light : routes.images.github.dark;
    }
  }, [app.isLight, props.item.publishedAt]);

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
            color={grey[app.isLight ? 700 : 500]}
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
          {props.item.keywords
            .sort((a: string, b: string) => b.length - a.length)
            .map((keyword: string) => (
              <Grid item key={`media-keyword-${keyword}`}>
                <Chip
                  label={keyword}
                  color="success"
                  variant={props.selectedKeywords.includes(keyword) ? "filled" : "outlined"}
                  size="small"
                  onClick={() => props.onKeywordClicked(keyword)}
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
