import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

interface KeywordChipsProps {
  keywords: string[];
  selectedKeywords: string[];
  fadeTime: number;
  onKeywordClicked: (keyword: string) => void;
  onClearSelection: () => void;
}

export function KeywordChips(props: KeywordChipsProps) {
  const smallHeight = useMediaQuery("(max-width:600px)");

  return (
    <Fade in={true} timeout={props.fadeTime}>
      <Grid container rowSpacing={smallHeight ? 1 : 2} columnSpacing={1}>
        {props.keywords
          .sort((a: string, b: string) => a.localeCompare(b))
          .map((keyword: string, idx: number) => (
            <Grid item key={`keyword-${idx}`}>
              <Chip
                label={keyword}
                color="success"
                variant={props.selectedKeywords.includes(keyword) ? "filled" : "outlined"}
                size={smallHeight ? "small" : "medium"}
                onClick={() => props.onKeywordClicked(keyword)}
              />
            </Grid>
          ))}
        <Fade in={props.selectedKeywords.length > 0} timeout={300}>
          <Grid item>
            <Chip
              label={"Show all"}
              color="secondary"
              variant={"filled"}
              size={smallHeight ? "small" : "medium"}
              onClick={props.onClearSelection}
            />
          </Grid>
        </Fade>
      </Grid>
    </Fade>
  );
}
