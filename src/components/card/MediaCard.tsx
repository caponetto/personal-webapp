import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LaunchIcon from "@mui/icons-material/Launch";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { enUS, es, ptBR } from "date-fns/locale";
import { KeyboardEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useThemeModeContext } from "../../context/AppContext";
import { useElementOverflow } from "../../hooks/useElementOverflow";
import { KeywordSelection } from "../../hooks/useKeywordSelection";
import { SupportedLanguages } from "../../i18n";
import { tLiteral } from "../../i18n/literal";
import { routes } from "../../routes";
import { MediaItem, MediaKind } from "../../schema";
import { StaticChip } from "../chip/StaticChip";
import { HoverableCard } from "./HoverableCard";

type MediaCardProps = Readonly<{
  item: MediaItem;
  keywordSelection: KeywordSelection;
}>;

function resolveDateLocale(language: string | undefined) {
  if (language === SupportedLanguages.Portuguese) {
    return ptBR;
  }
  if (language === SupportedLanguages.Spanish) {
    return es;
  }
  return enUS;
}

function resolveAccessMediaButtonLabel(kind: MediaKind, t: ReturnType<typeof useTranslation>["t"]): string {
  if ((["post", "thesis", "patent"] as MediaKind[]).includes(kind)) {
    return tLiteral(t, "read");
  }
  if (kind === "live") {
    return tLiteral(t, "watch");
  }
  if (kind === "conference") {
    return tLiteral(t, "viewSlides");
  }
  return tLiteral(t, "view");
}

function resolvePublicationIcon(
  publication: MediaItem["publication"],
  isLightMode: boolean,
  t: ReturnType<typeof useTranslation>["t"],
) {
  switch (publication) {
    case "kieCommunity":
      return { name: tLiteral(t, "kieCommunity"), route: routes.static.images.kie };
    case "towardsDataScience":
      return { name: tLiteral(t, "towardsDataScience"), route: routes.static.images.tds };
    case "unicamp":
      return {
        name: tLiteral(t, "unicamp"),
        route: isLightMode ? routes.static.images.unicamp.light : routes.static.images.unicamp.dark,
      };
    case "theDevelopersConference":
      return { name: tLiteral(t, "theDevelopersConference"), route: routes.static.images.tdc };
    case "gitHub":
      return {
        name: tLiteral(t, "github"),
        route: isLightMode ? routes.static.images.github.light : routes.static.images.github.dark,
      };
    default:
      return undefined;
  }
}

function mediaCardSx(hasTargetUrl: boolean) {
  return {
    width: 1,
    height: 1,
    display: "flex",
    flexDirection: "column",
    cursor: hasTargetUrl ? "pointer" : "default",
    "& .media-card-open-hint": {
      opacity: 0,
      transform: "translateY(2px)",
      transition: "opacity 120ms ease, transform 120ms ease",
    },
    "& .media-card-publication-icon": {
      transition: "transform 180ms ease",
      transformOrigin: "center",
    },
    "& .media-card-title": {
      transition: "color 160ms ease",
    },
    ...(hasTargetUrl && {
      "&:hover, &:focus-visible, &:focus-within": {
        borderColor: "success.main",
        backgroundColor: "rgba(0, 128, 96, 0.04)",
        transform: "translateY(-1px)",
      },
      "&:hover .media-card-publication-icon, &:focus-visible .media-card-publication-icon, &:focus-within .media-card-publication-icon":
        {
          transform: "scale(1.02)",
        },
      "&:hover .media-card-title, &:focus-visible .media-card-title, &:focus-within .media-card-title": {
        color: "success.dark",
      },
      "&:hover .media-card-open-hint, &:focus-visible .media-card-open-hint, &:focus-within .media-card-open-hint": {
        opacity: 1,
        transform: "translateY(0)",
      },
    }),
    ...(!hasTargetUrl && {
      "&:hover": {
        transform: "none",
      },
    }),
  };
}

export function MediaCard(props: MediaCardProps) {
  const { colorMode } = useThemeModeContext();
  const { t, i18n } = useTranslation();
  const isLightMode = colorMode === "light";
  const overflowDependencyKey = `${props.item.title}::${i18n.resolvedLanguage ?? ""}`;
  const { elementRef: titleRef, isOverflowing: isTitleOverflowing } =
    useElementOverflow<HTMLElement>(overflowDependencyKey);

  const accessMediaButtonLabel = resolveAccessMediaButtonLabel(props.item.kind, t);
  const dateLocale = resolveDateLocale(i18n.resolvedLanguage);

  const formattedMediaDate = (["code", "thesis"] as MediaKind[]).includes(props.item.kind)
    ? format(props.item.releaseDate, "yyyy")
    : format(props.item.releaseDate, "PPP", { locale: dateLocale });

  const publicationIcon = resolvePublicationIcon(props.item.publication, isLightMode, t);
  const keywords = useMemo(
    () =>
      [...props.item.keywordKeys]
        .map((key) => ({
          key,
          label: t(`literal:${key}`, { defaultValue: key }),
          isSelected: !!props.keywordSelection.selectionMap.get(key),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [props.item.keywordKeys, props.keywordSelection.selectionMap, t],
  );
  const metadataLabel = [formattedMediaDate, publicationIcon?.name].filter(Boolean).join(" • ");
  const hasTargetUrl = Boolean(props.item.url);
  const openItemUrl = (focusTarget?: EventTarget | null) => {
    if (!props.item.url || globalThis.window === undefined) {
      return;
    }
    if (focusTarget instanceof HTMLElement) {
      focusTarget.blur();
    }
    globalThis.window.open(props.item.url, "_blank", "noopener,noreferrer");
  };
  const onCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!hasTargetUrl) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openItemUrl(event.currentTarget);
    }
  };

  return (
    <HoverableCard
      data-testid="media-card"
      role={hasTargetUrl ? "link" : undefined}
      tabIndex={hasTargetUrl ? 0 : undefined}
      aria-label={hasTargetUrl ? `${accessMediaButtonLabel}: ${props.item.title}` : undefined}
      onClick={hasTargetUrl ? (event) => openItemUrl(event.currentTarget) : undefined}
      onKeyDown={onCardKeyDown}
      data-card-id={props.item.id}
      sx={mediaCardSx(hasTargetUrl)}
    >
      <CardHeader
        title={
          <Typography
            variant="caption"
            sx={{ lineHeight: 1.35, mt: "2px", mb: "2px" }}
            color={grey[isLightMode ? 600 : 400]}
            component="div"
          >
            {metadataLabel}
          </Typography>
        }
        subheader={
          <Tooltip
            title={props.item.title}
            arrow
            disableHoverListener={!isTitleOverflowing}
            disableFocusListener={!isTitleOverflowing}
            disableTouchListener={!isTitleOverflowing}
          >
            <Typography
              className="media-card-title"
              data-testid={`media-card-title-${props.item.id}`}
              ref={titleRef}
              sx={{
                fontSize: { xs: "0.98rem", sm: "1.06rem" },
                fontWeight: 600,
                lineHeight: 1.35,
                minHeight: "2.8em",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                mt: "6px",
              }}
              color={grey[isLightMode ? 700 : 500]}
            >
              {props.item.title}
            </Typography>
          </Tooltip>
        }
        sx={{
          pt: 1.5,
          pb: 0.75,
          px: 2,
          "& .MuiCardHeader-action": {
            mt: 0.5,
            mr: 0.25,
          },
          "& .MuiCardHeader-content": {
            overflow: "hidden",
          },
        }}
        action={
          publicationIcon && (
            <Tooltip title={publicationIcon.name} arrow>
              <img
                className="media-card-publication-icon"
                style={{ margin: "4px 8px 0px 16px", width: "20px", height: "20px" }}
                src={publicationIcon.route}
                alt={publicationIcon.name}
                loading="lazy"
              />
            </Tooltip>
          )
        }
      />
      <CardContent sx={{ pt: 0.5, pb: 0.75, px: 2 }}>
        <Grid container spacing={1}>
          {keywords.map((keyword) => (
            <Grid key={`media-keyword-${keyword.key}`}>
              <StaticChip
                label={keyword.label}
                color="success"
                variant={keyword.isSelected ? "filled" : "outlined"}
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  props.keywordSelection.onToggleSelection(keyword.key);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ pt: 0.5, px: 2, pb: 1.5, mt: "auto" }}>
        <Box sx={{ width: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Box className="media-card-open-hint" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
            {hasTargetUrl && (
              <>
                <Typography variant="caption" color="text.secondary">
                  {accessMediaButtonLabel}
                </Typography>
                <LaunchIcon sx={{ color: "text.secondary", fontSize: 14 }} />
              </>
            )}
          </Box>
        </Box>
      </CardActions>
    </HoverableCard>
  );
}
