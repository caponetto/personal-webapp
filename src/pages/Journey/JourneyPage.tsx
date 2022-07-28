import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import { Trans, useTranslation } from "react-i18next";
import { ChipGrid } from "../../components/chip";
import { Page } from "../../components/page";
import { useApp } from "../../context/AppContext";
import { JourneyCard } from "./JourneyCard";
import { JourneyList } from "./JourneyList";

const SECTION_FADE_TIME = {
  education: 1000,
  certifications: 1200,
  awards: 1400,
  toolbox: 1600,
  experience: 1800,
};

export default function JourneyPage() {
  const {
    schema: { personal, journey },
  } = useApp();
  const { t } = useTranslation();

  return (
    <Page
      name="journey"
      headerContent={
        <Trans i18nKey="journey:header">
          Here you can see my <strong>journey</strong> summary
        </Trans>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            <Fade in={true} timeout={SECTION_FADE_TIME.education}>
              <Grid item xs={12} xl={6}>
                <JourneyCard
                  title={t("literal:education")}
                  icon={<SchoolOutlinedIcon />}
                  moreDetailsUrl={personal.urls.linkedin}
                >
                  <JourneyList kind="education" items={journey.education} />
                </JourneyCard>
              </Grid>
            </Fade>
            <Fade in={true} timeout={SECTION_FADE_TIME.certifications}>
              <Grid item xs={12} xl={6}>
                <JourneyCard
                  title={t("literal:certifications")}
                  icon={<VerifiedOutlinedIcon />}
                  moreDetailsUrl={personal.urls.linkedin}
                >
                  <JourneyList kind="certification" items={journey.certification} />
                </JourneyCard>
              </Grid>
            </Fade>
            <Fade in={true} timeout={SECTION_FADE_TIME.toolbox}>
              <Grid item xs={12}>
                <JourneyCard
                  title={t("literal:toolbox")}
                  icon={<HomeRepairServiceOutlinedIcon />}
                  moreDetailsUrl={personal.urls.linkedin}
                >
                  <ChipGrid groupName="skills" items={journey.toolbox} />
                </JourneyCard>
              </Grid>
            </Fade>
            <Fade in={true} timeout={SECTION_FADE_TIME.awards}>
              <Grid item xs={12} xl={6}>
                <JourneyCard
                  title={t("literal:awards")}
                  icon={<EmojiEventsOutlinedIcon />}
                  moreDetailsUrl={personal.urls.linkedin}
                >
                  <JourneyList kind="award" items={journey.award} />
                </JourneyCard>
              </Grid>
            </Fade>
          </Grid>
        </Grid>
        <Fade in={true} timeout={SECTION_FADE_TIME.experience}>
          <Grid item xs={12} lg={5}>
            <JourneyCard
              title={t("literal:experience")}
              icon={<WorkOutlineOutlinedIcon />}
              moreDetailsUrl={personal.urls.linkedin}
            >
              <JourneyList kind="experience" items={journey.experience} />
            </JourneyCard>
          </Grid>
        </Fade>
      </Grid>
    </Page>
  );
}
