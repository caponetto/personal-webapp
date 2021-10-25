import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { Media } from "../common/Media";
import { MediaCard } from "./MediaCard";

interface MediaSectionProps {
  title: string;
  mediaList: Media[];
  fadeTime: number;
  selectedKeywords: string[];
  onKeywordClicked: (keyword: string) => void;
}

export function MediaSection(props: MediaSectionProps) {
  return (
    <Fade in={true} timeout={props.fadeTime}>
      <Box sx={{ mt: "30px" }}>
        <Divider textAlign="left" sx={{ mb: "30px", "::before": { width: "1%" }, "::after": { width: "99%" } }}>
          <Typography
            fontWeight="light"
            variant="overline"
            component="div"
            sx={{ fontSize: "14px", color: "text.secondary" }}
          >
            {props.title}
          </Typography>
        </Divider>
        <Grid container spacing={3}>
          {props.mediaList.map((item: Media, idx: number) => (
            <Grid item key={`${props.title}-${idx}`} sx={{ width: { xs: "100%", lg: "50%", xl: "33%" } }}>
              <MediaCard
                item={item}
                selectedKeywords={props.selectedKeywords}
                onKeywordClicked={props.onKeywordClicked}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
}
