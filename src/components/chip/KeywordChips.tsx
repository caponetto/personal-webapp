import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { KeywordSelection } from "../../hooks/useKeywordSelection";
import { StaticChip } from "./StaticChip";

interface KeywordChipsProps {
  fadeTime: number;
  keywordSelection: KeywordSelection;
}

export function KeywordChips(props: KeywordChipsProps) {
  const { t } = useTranslation();
  const smallHeight = useMediaQuery("(max-width:600px)");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolveLiteral = useCallback((key: string) => t(`literal:${key}` as any), [t]);

  return (
    <Fade in={true} timeout={props.fadeTime}>
      <Grid container rowSpacing={smallHeight ? 1 : 2} columnSpacing={1}>
        {[...props.keywordSelection.selectionMap.keys()]
          .sort((a, b) => resolveLiteral(a).localeCompare(resolveLiteral(b)))
          .map((keywordKey) => (
            <Grid item key={`keyword-chip-${keywordKey}`}>
              <StaticChip
                label={resolveLiteral(keywordKey)}
                color="success"
                variant={props.keywordSelection.selectionMap.get(keywordKey) ? "filled" : "outlined"}
                size={smallHeight ? "small" : "medium"}
                onClick={() => props.keywordSelection.onToggleSelection(keywordKey)}
              />
            </Grid>
          ))}
        <Fade in={props.keywordSelection.isAnySelected} timeout={300}>
          <Grid item sx={{ display: props.keywordSelection.isAnySelected ? "block" : "none" }}>
            <StaticChip
              label={t("literal:showAll")}
              color="secondary"
              variant={"filled"}
              size={smallHeight ? "small" : "medium"}
              onClick={props.keywordSelection.onClearSelection}
            />
          </Grid>
        </Fade>
      </Grid>
    </Fade>
  );
}
