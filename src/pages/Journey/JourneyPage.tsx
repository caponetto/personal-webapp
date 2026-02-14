import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { ChipGrid } from "../../components/chip";
import { Page } from "../../components/page";
import { useSchemaContext } from "../../context/AppContext";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { JourneyCard } from "./JourneyCard";
import { JourneyList } from "./JourneyList";

const SECTION_FADE_TIME = {
  education: 220,
  certifications: 260,
  awards: 300,
  toolbox: 340,
  experience: 380,
};

export default function JourneyPage() {
  const { journey } = useSchemaContext();
  const { t } = useTranslation();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const fadeTime = reduceMotion
    ? { education: 0, certifications: 0, awards: 0, toolbox: 0, experience: 0 }
    : SECTION_FADE_TIME;

  return (
    <Page name="journey" headerContent={t("journey:header")} headerSubtitle={t("journey:headerSubtitle")}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid size={{ xs: 12, lg: 7 }}>
          <Grid container spacing={2} alignItems="flex-start">
            <Fade in={true} timeout={fadeTime.education}>
              <Grid size={{ xs: 12, xl: 6 }}>
                <JourneyCard title={t("literal:education")} icon={<SchoolOutlinedIcon />}>
                  <JourneyList kind="education" items={journey.education} />
                </JourneyCard>
              </Grid>
            </Fade>
            <Fade in={true} timeout={fadeTime.certifications}>
              <Grid size={{ xs: 12, xl: 6 }}>
                <JourneyCard title={t("literal:certifications")} icon={<WorkspacePremiumOutlinedIcon />}>
                  <JourneyList kind="certification" items={journey.certification} />
                </JourneyCard>
              </Grid>
            </Fade>
            <Fade in={true} timeout={fadeTime.toolbox}>
              <Grid size={{ xs: 12 }}>
                <JourneyCard title={t("literal:toolbox")} icon={<BuildOutlinedIcon />}>
                  <ChipGrid groupName="skills" items={journey.toolbox} />
                </JourneyCard>
              </Grid>
            </Fade>
            <Fade in={true} timeout={fadeTime.awards}>
              <Grid size={{ xs: 12, xl: 6 }}>
                <JourneyCard title={t("literal:awards")} icon={<EmojiEventsOutlinedIcon />}>
                  <JourneyList kind="award" items={journey.award} />
                </JourneyCard>
              </Grid>
            </Fade>
          </Grid>
        </Grid>
        <Fade in={true} timeout={fadeTime.experience}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <JourneyCard title={t("literal:experience")} icon={<WorkOutlineOutlinedIcon />}>
              <ExperienceTimeline items={journey.experience} />
            </JourneyCard>
          </Grid>
        </Fade>
      </Grid>
    </Page>
  );
}
