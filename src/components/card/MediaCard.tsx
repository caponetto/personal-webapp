import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { enUS, es, ptBR } from "date-fns/locale";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { Fonts } from "../../fonts";
import { KeywordSelection } from "../../hooks/useKeywordSelection";
import { SupportedLanguages } from "../../i18n";
import { routes } from "../../routes";
import { MediaItem, MediaKind } from "../../schema";
import { ExternalLinkButton } from "../button";
import { StaticChip } from "../chip/StaticChip";
import { HoverableCard } from "./HoverableCard";

interface MediaCardProps {
  item: MediaItem;
  keywordSelection: KeywordSelection;
}

export function MediaCard(props: MediaCardProps) {
  const { colorMode } = useApp();
  const { t, i18n } = useTranslation();

  const isLightMode = useMemo(() => colorMode === "light", [colorMode]);

  const accessMediaButtonLabel = useMemo(() => {
    if ((["post", "thesis", "patent"] as MediaKind[]).includes(props.item.kind)) {
      return t("literal:read");
    }

    if (props.item.kind === "live") {
      return t("literal:watch");
    }

    if (props.item.kind === "conference") {
      return t("literal:slides");
    }

    return t("literal:view");
  }, [props.item.kind, t]);

  const dateLocale = useMemo(() => {
    switch (i18n.resolvedLanguage) {
      case SupportedLanguages.Portuguese:
        return ptBR;
      case SupportedLanguages.Spanish:
        return es;
      case SupportedLanguages.English:
      default:
        return enUS;
    }
  }, [i18n.resolvedLanguage]);

  const formattedMediaDate = useMemo(() => {
    if ((["code", "thesis"] as MediaKind[]).includes(props.item.kind)) {
      return format(props.item.releaseDate, "yyyy");
    }

    return format(props.item.releaseDate, "PPP", {
      locale: dateLocale,
    });
  }, [dateLocale, props.item.kind, props.item.releaseDate]);

  const publicationIcon = useMemo<{ name: string; route: string } | undefined>(() => {
    switch (props.item.publication) {
      case "kieCommunity":
        return { name: t("literal:kieCommunity"), route: routes.static.images.kie };
      case "towardsDataScience":
        return { name: t("literal:towardsDataScience"), route: routes.static.images.tds };
      case "unicamp":
        return {
          name: t("literal:unicamp"),
          route: isLightMode ? routes.static.images.unicamp.light : routes.static.images.unicamp.dark,
        };
      case "theDevelopersConference":
        return { name: t("literal:theDevelopersConference"), route: routes.static.images.tdc };
      case "gitHub":
        return {
          name: t("literal:github"),
          route: isLightMode ? routes.static.images.github.light : routes.static.images.github.dark,
        };
    }
  }, [isLightMode, props.item.publication, t]);

  return (
    <HoverableCard>
      <CardHeader
        title={
          <Typography
            sx={{
              fontFamily: Fonts.OXYGEN,
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "bold",
              height: { xs: "auto", lg: "50px" },
            }}
            color={grey[isLightMode ? 700 : 500]}
            gutterBottom
          >
            {props.item.title}
          </Typography>
        }
        action={
          publicationIcon && (
            <Tooltip title={publicationIcon.name} arrow>
              <img
                style={{ margin: "4px 8px 0px 16px", width: "20px", height: "20px" }}
                src={publicationIcon.route}
                alt={""}
                loading="lazy"
              />
            </Tooltip>
          )
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Grid sx={{ height: { xs: "auto", lg: "50px" } }} container spacing={1}>
          {[...props.item.keywordKeys]
            .sort((a, b) => b.length - a.length)
            .map((keywordKey) => (
              <Grid item key={`media-keyword-${keywordKey}`}>
                <StaticChip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  label={t(`literal:${keywordKey}` as any) as string}
                  color="success"
                  variant={props.keywordSelection.selectionMap.get(keywordKey) ? "filled" : "outlined"}
                  size="small"
                  onClick={() => props.keywordSelection.onToggleSelection(keywordKey)}
                />
              </Grid>
            ))}
        </Grid>
      </CardContent>
      <CardActions sx={{ pt: 0, px: "16px" }}>
        <Box sx={{ width: 1 }}>
          <Typography sx={{ fontSize: 13, float: "left", lineHeight: "30px" }} color="text.secondary" component="div">
            {formattedMediaDate}
          </Typography>
          {props.item.url && <ExternalLinkButton title={accessMediaButtonLabel} href={props.item.url} />}
        </Box>
      </CardActions>
    </HoverableCard>
  );
}
