import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { Media } from "../Common/Media";
import { routes } from "../Common/Routes";
import { useApp } from "../Context/AppContext";

export function MediaCard(props: Media) {
  const app = useApp();
  const [isMouseOver, setMouseOver] = useState(false);

  const accessMediaButtonLabel = useMemo(() => {
    if (["post", "thesis"].includes(props.type)) {
      return "Read";
    }

    if (props.type === "live") {
      return "Watch";
    }

    if (props.type === "conference") {
      return "Slides";
    }

    return "View";
  }, [props.type]);

  const formattedMediaDate = useMemo(() => {
    if (["code", "thesis"].includes(props.type)) {
      return format(props.releaseDate, "yyyy");
    }

    return format(props.releaseDate, "MMM dd, yyyy");
  }, [props.releaseDate, props.type]);

  const iconRoute = useMemo(() => {
    if (props.publishedAt === "KIE Community") {
      return routes.images.kie;
    }

    if (props.publishedAt === "Towards Data Science") {
      return routes.images.tds;
    }

    if (props.publishedAt === "UNICAMP") {
      return app.isLight ? routes.images.unicamp.light : routes.images.unicamp.dark;
    }

    if (props.publishedAt === "The Developer's Conference") {
      return routes.images.tdc;
    }

    if (props.publishedAt === "GitHub") {
      return app.isLight ? routes.images.github.light : routes.images.github.dark;
    }
  }, [app.isLight, props.publishedAt]);

  return (
    <Card
      elevation={isMouseOver ? 5 : 2}
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <CardHeader
        title={
          <Typography
            sx={{ fontSize: 16, fontWeight: "500", height: { xs: "auto", lg: "50px" } }}
            color={grey[app.isLight ? 700 : 500]}
            gutterBottom
          >
            {props.title}
          </Typography>
        }
        action={
          iconRoute && (
            <Tooltip title={props.publishedAt} arrow>
              <img style={{ margin: "4px 8px 0px 16px", width: "25px" }} src={iconRoute} alt={""} loading="lazy" />
            </Tooltip>
          )
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Grid sx={{ height: { xs: "auto", lg: "50px" } }} container spacing={1}>
          {props.keywords
            .sort((a: string, b: string) => b.length - a.length)
            .map((keyword: string, idx: number) => (
              <Grid item key={`media-keyword-${idx}`}>
                <Chip label={keyword} color="info" variant="outlined" size="small" />
              </Grid>
            ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ pt: 0, px: "16px" }}>
        <Box sx={{ width: 1 }}>
          <Typography sx={{ fontSize: 13, float: "left", lineHeight: "30px" }} color="text.secondary" component="div">
            {formattedMediaDate}
          </Typography>
          {props.url && (
            <Button
              sx={{ float: "right" }}
              size="small"
              endIcon={<LaunchIcon />}
              onClick={() => window.open(props.url, "_blank")}
            >
              {accessMediaButtonLabel}
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
