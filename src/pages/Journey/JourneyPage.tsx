import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Trans, useTranslation } from "react-i18next";
import { Page, PageHeader } from "../../components/page";
import { useApp } from "../../context/AppContext";
import { usePageActive } from "../../hooks/usePageActive";
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
  const app = useApp();
  const { t } = useTranslation();
  const active = usePageActive(0);

  return (
    <Page name="journey">
      <PageHeader>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="journey:header">
            Here you can see my <strong>journey</strong> summary
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            <Grid container spacing={2}>
              <Fade in={true} timeout={SECTION_FADE_TIME.education}>
                <Grid item xs={12} xl={6}>
                  <JourneyCard
                    title={t("literal:education")}
                    icon={<SchoolOutlinedIcon />}
                    content={<JourneyList kind="education" items={app.schema.journey.education} />}
                  />
                </Grid>
              </Fade>
              <Fade in={true} timeout={SECTION_FADE_TIME.certifications}>
                <Grid item xs={12} xl={6}>
                  <JourneyCard
                    title={t("literal:certifications")}
                    icon={<VerifiedOutlinedIcon />}
                    content={<JourneyList kind="certification" items={app.schema.journey.certification} />}
                  />
                </Grid>
              </Fade>
              <Fade in={true} timeout={SECTION_FADE_TIME.toolbox}>
                <Grid item xs={12}>
                  <JourneyCard
                    title={t("literal:toolbox")}
                    icon={<HomeRepairServiceOutlinedIcon />}
                    content={
                      <Grid container spacing={1}>
                        {[...app.schema.journey.toolbox]
                          .sort((a, b) => a.localeCompare(b))
                          .map((skill: string) => (
                            <Grid item key={`skill-${skill}`}>
                              <Chip
                                label={skill}
                                color="default"
                                variant="outlined"
                                size="small"
                                sx={{ borderRadius: "8px" }}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    }
                  />
                </Grid>
              </Fade>
              <Fade in={true} timeout={SECTION_FADE_TIME.awards}>
                <Grid item xs={12} xl={6}>
                  <JourneyCard
                    title={t("literal:awards")}
                    icon={<EmojiEventsIcon />}
                    content={<JourneyList kind="award" items={app.schema.journey.award} />}
                  />
                </Grid>
              </Fade>
            </Grid>
          </Grid>
          <Fade in={true} timeout={SECTION_FADE_TIME.experience}>
            <Grid item xs={12} lg={5}>
              <JourneyCard
                title={t("literal:experience")}
                icon={<WorkOutlineOutlinedIcon />}
                content={<JourneyList kind="experience" items={app.schema.journey.experience} />}
              />
            </Grid>
          </Fade>
        </Grid>
      )}
    </Page>
  );
}
