import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { KeywordSelection } from "../../hooks/useKeywordSelection";
import { MediaItem } from "../../schema";
import { MediaCard } from "../card";

const DEFAULT_FADE_TIME: MediaSectionFadeTime = {
  title: 500,
  item: 1000,
};

export interface MediaSectionFadeTime {
  title: number;
  item: number;
}

interface MediaSectionProps {
  title: string;
  mediaItems: MediaItem[];
  fadeTime?: MediaSectionFadeTime;
  keywordSelection: KeywordSelection;
}

export function MediaSection(props: MediaSectionProps) {
  return (
    <>
      {props.mediaItems.length > 0 && (
        <Fade in={true} timeout={props.fadeTime?.title ?? DEFAULT_FADE_TIME.title}>
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
              {props.mediaItems.map((item: MediaItem, idx: number) => (
                <Fade in={true} timeout={props.fadeTime?.item ?? DEFAULT_FADE_TIME.item} key={`${props.title}-${idx}`}>
                  <Grid item sx={{ width: { xs: "100%", lg: "50%", xl: "33%" } }}>
                    <MediaCard item={item} keywordSelection={props.keywordSelection} />
                  </Grid>
                </Fade>
              ))}
            </Grid>
          </Box>
        </Fade>
      )}
    </>
  );
}
