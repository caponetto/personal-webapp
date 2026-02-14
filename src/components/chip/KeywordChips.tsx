import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeywordSelection } from "../../hooks/useKeywordSelection";
import { useVisibleChipLimit } from "../../hooks/useVisibleChipLimit";
import { StaticChip } from "./StaticChip";

const DEFAULT_FADE_TIME = 240;
const statusBadgeSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  px: 1,
  py: 0.3,
  minHeight: 30,
  borderRadius: "999px",
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.default",
};

type KeywordChipsProps = Readonly<{
  fadeTime?: number;
  keywordSelection: KeywordSelection;
  resultCount?: number;
  totalCount?: number;
}>;

export function KeywordChips(props: KeywordChipsProps) {
  const { t } = useTranslation();
  const { isSmallScreen, visibleLimit } = useVisibleChipLimit();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [showAllTopics, setShowAllTopics] = useState(false);

  const resolveLiteral = useCallback((key: string) => t(`literal:${key}`, { defaultValue: key }), [t]);
  const sortedKeywords = useMemo(
    () =>
      [...props.keywordSelection.selectionMap.entries()]
        .map(([key, isSelected]) => ({
          key,
          label: resolveLiteral(key),
          isSelected: !!isSelected,
        }))
        .sort((a, b) => {
          if (a.isSelected && !b.isSelected) {
            return -1;
          }
          if (!a.isSelected && b.isSelected) {
            return 1;
          }

          return a.label.localeCompare(b.label);
        }),
    [props.keywordSelection.selectionMap, resolveLiteral],
  );
  const selectedCount = useMemo(() => sortedKeywords.filter((keyword) => keyword.isSelected).length, [sortedKeywords]);
  const visibleUnselectedCount = Math.max(visibleLimit - selectedCount, 0);
  const shouldCollapseTopics = sortedKeywords.length > visibleLimit;
  const isCollapsed = shouldCollapseTopics && !showAllTopics;
  const visibleKeywords = isCollapsed
    ? [
        ...sortedKeywords.filter((keyword) => keyword.isSelected),
        ...sortedKeywords.filter((keyword) => !keyword.isSelected).slice(0, visibleUnselectedCount),
      ]
    : sortedKeywords;

  return (
    <Fade in={true} timeout={reduceMotion ? 0 : (props.fadeTime ?? DEFAULT_FADE_TIME)}>
      <Grid
        container
        rowSpacing={isSmallScreen ? 0.75 : 1}
        columnSpacing={1}
        sx={{
          p: { xs: 1.25, sm: 1.5 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          backgroundColor: "background.paper",
        }}
      >
        <Grid size={12}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "flex-start",
              gap: 1,
              mb: 0.75,
            }}
          >
            <Box sx={statusBadgeSx}>
              <Box
                component="span"
                data-testid="filters-active-badge"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
              >
                <FilterAltOutlinedIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {t("common:filters.summaryCompact", {
                    selected: selectedCount,
                    totalKeywords: props.keywordSelection.selectionMap.size,
                  })}
                </Typography>
              </Box>
              {props.keywordSelection.isAnySelected && (
                <IconButton
                  data-testid="clear-filters-button"
                  size="small"
                  aria-label={t("common:filters.clearFilters")}
                  onClick={props.keywordSelection.onClearSelection}
                  sx={{ width: 24, height: 24, p: 0 }}
                >
                  <CloseIcon sx={{ fontSize: 12 }} />
                </IconButton>
              )}
            </Box>
            {typeof props.resultCount === "number" && typeof props.totalCount === "number" && (
              <Box sx={statusBadgeSx}>
                <Box
                  component="span"
                  data-testid="filters-results-badge"
                  sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
                >
                  <ViewAgendaOutlinedIcon fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {t("common:filters.results", {
                      shown: props.resultCount,
                      total: props.totalCount,
                    })}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
        {visibleKeywords.map((keyword) => (
          <Grid key={`keyword-chip-${keyword.key}`}>
            <StaticChip
              data-testid={`keyword-chip-${keyword.key}`}
              title={keyword.label}
              label={keyword.label}
              color="success"
              variant={keyword.isSelected ? "filled" : "outlined"}
              size={isSmallScreen ? "small" : "medium"}
              sx={{
                maxWidth: { xs: "220px", sm: "none" },
                borderWidth: keyword.isSelected ? "2px" : "1px",
                "& .MuiChip-label": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: keyword.isSelected ? 600 : 500,
                  color: keyword.isSelected ? "common.white" : "text.secondary",
                },
              }}
              onClick={() => props.keywordSelection.onToggleSelection(keyword.key)}
            />
          </Grid>
        ))}
        {shouldCollapseTopics && (
          <Grid size={12}>
            <Button color="success" size="small" onClick={() => setShowAllTopics((prevState) => !prevState)}>
              {showAllTopics ? t("common:filters.showLessTopics") : t("common:filters.showMoreTopics")}
            </Button>
          </Grid>
        )}
      </Grid>
    </Fade>
  );
}
