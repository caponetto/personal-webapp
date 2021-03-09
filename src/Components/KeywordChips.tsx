import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import React from "react";

interface KeywordChipsProps {
  keywords: string[];
  selected: string[];
  onKeywordClicked: (keyword: string) => void;
  fadeTime: number;
}

export function KeywordChips(props: KeywordChipsProps) {
  return (
    <Fade in={true} timeout={props.fadeTime}>
      <Grid container spacing={1}>
        {props.keywords
          .sort((a: string, b: string) => a.localeCompare(b))
          .map((keyword: string, idx: number) => (
            <Grid item key={`keyword-${idx}`}>
              <Chip
                label={keyword}
                color="success"
                variant={props.selected.includes(keyword) ? "filled" : "outlined"}
                size="medium"
                onClick={() => props.onKeywordClicked(keyword)}
              />
            </Grid>
          ))}
      </Grid>
    </Fade>
  );
}
