import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { KeywordSelection } from "../../hooks/useKeywordSelection";
import { MediaItem } from "../../schema";
import { MediaCard } from "../card";

type MediaSectionProps = Readonly<{
  title: string;
  mediaItems: MediaItem[];
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
  if (props.mediaItems.length === 0) {
    return null;
  }
  const isSingleItemSection = props.mediaItems.length === 1;
  const isTwoItemSection = props.mediaItems.length === 2;

  const cardGridSize = resolveCardGridSize(isSingleItemSection, isTwoItemSection);

  return (
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
        {props.mediaItems.map((item: MediaItem) => (
          <Grid key={item.id} size={cardGridSize} sx={{ display: "flex" }}>
            <MediaCard item={item} keywordSelection={props.keywordSelection} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
