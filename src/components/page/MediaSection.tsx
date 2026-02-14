import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { KeywordSelection } from "../../hooks/useKeywordSelection";
import { MediaItem } from "../../schema";
import { MediaCard } from "../card";

const DEFAULT_FADE_TIME: MediaSectionFadeTime = {
  title: 220,
  item: 320,
};

export interface MediaSectionFadeTime {
  title: number;
  item: number;
}

type MediaSectionProps = Readonly<{
  title: string;
  mediaItems: MediaItem[];
  fadeTime?: MediaSectionFadeTime;
  keywordSelection: KeywordSelection;
}>;

function resolveCardGridSize(isSingleItemSection: boolean, isTwoItemSection: boolean) {
  if (isSingleItemSection) {
    return { xs: 12, md: 8, lg: 6 };
  }
  if (isTwoItemSection) {
    return { xs: 12, lg: 6 };
  }
  return { xs: 12, lg: 6, xl: 4 };
}

export function MediaSection(props: MediaSectionProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (props.mediaItems.length === 0) {
    return null;
  }
  const isSingleItemSection = props.mediaItems.length === 1;
  const isTwoItemSection = props.mediaItems.length === 2;

  const cardGridSize = resolveCardGridSize(isSingleItemSection, isTwoItemSection);

  return (
    <Fade in={true} timeout={reduceMotion ? 0 : (props.fadeTime?.title ?? DEFAULT_FADE_TIME.title)}>
      <Box sx={{ mt: { xs: 4, md: 5 } }}>
        <Divider
          textAlign="left"
          sx={{
            mb: { xs: 2.5, md: 3 },
            "::before": { width: "1%" },
            "::after": { width: "99%" },
            opacity: 0.55,
          }}
        >
          <Typography
            fontWeight={600}
            variant="overline"
            component="div"
            sx={{ fontSize: { xs: "0.82rem", md: "0.86rem" }, color: "text.secondary" }}
          >
            {`${props.title} (${props.mediaItems.length})`}
          </Typography>
        </Divider>
        <Grid container spacing={2.5}>
          {props.mediaItems.map((item: MediaItem, index: number) => (
            <Fade
              in={true}
              timeout={reduceMotion ? 0 : (props.fadeTime?.item ?? DEFAULT_FADE_TIME.item) + Math.min(index * 50, 220)}
              key={item.id}
            >
              <Grid size={cardGridSize} sx={{ display: "flex" }}>
                <MediaCard item={item} keywordSelection={props.keywordSelection} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
}
