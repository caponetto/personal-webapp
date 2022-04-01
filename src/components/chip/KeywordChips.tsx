import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface KeywordChipsProps {
  keywords: string[];
  selectedKeywords: string[];
  fadeTime: number;
  onKeywordClicked: (keyword: string) => void;
  onClearSelection: () => void;
}

export function KeywordChips(props: KeywordChipsProps) {
  const { t } = useTranslation();
  const smallHeight = useMediaQuery("(max-width:600px)");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolveLiteral = useCallback((key: string) => t(`literal:${key}` as any), [t]);

  return (
    <Fade in={true} timeout={props.fadeTime}>
      <Grid container rowSpacing={smallHeight ? 1 : 2} columnSpacing={1}>
        {[...props.keywords]
          .sort((a, b) => resolveLiteral(a).localeCompare(resolveLiteral(b)))
          .map((keywordKey) => (
            <Grid item key={`keyword-chip-${keywordKey}`}>
              <Chip
                label={resolveLiteral(keywordKey)}
                color="success"
                variant={props.selectedKeywords.includes(keywordKey) ? "filled" : "outlined"}
                size={smallHeight ? "small" : "medium"}
                onClick={() => props.onKeywordClicked(keywordKey)}
              />
            </Grid>
          ))}
        <Fade in={props.selectedKeywords.length > 0} timeout={300}>
          <Grid item sx={{ display: props.selectedKeywords.length > 0 ? "block" : "none" }}>
            <Chip
              label={t("literal:showAll")}
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
