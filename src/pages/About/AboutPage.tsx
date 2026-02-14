import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import { Page } from "../../components/page";
import { useSchemaContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import { AboutNarrativeCard, AboutSection } from "./AboutNarrativeCard";
import { AboutSummaryCard } from "./AboutSummaryCard";

const FADE_TIME = {
  summary: 260,
  narrative: 320,
};

export default function AboutPage() {
  const { t } = useTranslation();
  const { personal, about } = useSchemaContext();
  const paragraphs = Array.isArray(about.paragraphs) ? about.paragraphs : [];

  const sections = (
    [
      { key: "currentWork", title: t("about:sections.currentWork"), content: paragraphs[0] ?? "" },
      { key: "howIWork", title: t("about:sections.howIWork"), content: paragraphs[1] ?? "" },
      { key: "background", title: t("about:sections.background"), content: paragraphs[2] ?? "" },
      { key: "focus", title: t("about:sections.focus"), content: paragraphs[3] ?? "" },
    ] satisfies AboutSection[]
  ).filter((section) => section.content.length > 0);

  const collaborationNote = paragraphs[4] ?? "";

  return (
    <Page name={"about"} headerContent={about.welcome} headerSubtitle={t("about:intro")}>
      <Grid container spacing={2.5} alignItems="flex-start">
        <Fade in={true} timeout={FADE_TIME.summary}>
          <Grid size={{ md: 12, lg: 4 }}>
            <AboutSummaryCard urls={personal.urls} />
          </Grid>
        </Fade>
        <Fade in={true} timeout={FADE_TIME.narrative}>
          <Grid size={{ md: 12, lg: 8 }}>
            <AboutNarrativeCard collaborationNote={collaborationNote} sections={sections} />
          </Grid>
        </Fade>
      </Grid>
    </Page>
  );
}
