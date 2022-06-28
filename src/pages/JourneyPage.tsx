import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import { HoverableCard } from "../components/card";
import { Page, PageHeader } from "../components/page";
import { useApp } from "../context/AppContext";
import { usePageActive } from "../hooks/usePageActive";
import { routes } from "../routes";
import { JourneyItem, JourneyKind } from "../schema";

export default function JourneyPage() {
  const app = useApp();
  const { t } = useTranslation();
  const active = usePageActive(0);

  return (
    <Page name="journey">
      <PageHeader fadeTime={500}>
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
              <Fade in={true} timeout={500}>
                <Grid item xs={12} xl={6}>
                  <JourneyCard
                    title={t("literal:education")}
                    icon={<SchoolOutlinedIcon />}
                    content={<JourneyList kind="education" items={app.schema.journey.education} />}
                  />
                </Grid>
              </Fade>
              <Fade in={true} timeout={1000}>
                <Grid item xs={12} xl={6}>
                  <JourneyCard
                    title={t("literal:certifications")}
                    icon={<VerifiedOutlinedIcon />}
                    content={<JourneyList kind="certification" items={app.schema.journey.certification} />}
                  />
                </Grid>
              </Fade>
              <Fade in={true} timeout={1500}>
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
            </Grid>
          </Grid>
          <Fade in={true} timeout={2000}>
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

interface JourneyCardProps {
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

function JourneyCard(props: JourneyCardProps) {
  const { t } = useTranslation();
  return (
    <HoverableCard>
      <CardHeader avatar={props.icon} title={<Typography sx={{ fontSize: "18px" }}>{props.title}</Typography>} />
      <CardContent>{props.content}</CardContent>
      <CardActions sx={{ pt: 0, px: "16px" }}>
        <Box sx={{ width: 1 }}>
          <Link underline="none" rel="noreferrer" target="_blank" href={routes.urls.social.linkedin}>
            <Button
              id={`${props.title}-more-details-button`}
              sx={{ float: "right" }}
              size="small"
              endIcon={<LaunchIcon />}
              color="success"
            >
              {t("literal:moreDetails")}
            </Button>
          </Link>
        </Box>
      </CardActions>
    </HoverableCard>
  );
}

interface JourneyListProps {
  kind: JourneyKind;
  items: JourneyItem[];
}

function JourneyList(props: JourneyListProps) {
  return (
    <List dense={true}>
      {props.items.map((item: JourneyItem, idx: number) => (
        <JourneyListItem key={`${props.kind}-item-${idx}`} item={item} />
      ))}
    </List>
  );
}

interface JourneyListItemProps {
  item: JourneyItem;
}

function JourneyListItem(props: JourneyListItemProps) {
  return (
    <ListItem>
      <ListItemText
        primary={props.item.title}
        secondary={
          <Box component="span">
            <Typography variant="overline">{String(props.item.period.start)}</Typography>
            {props.item.period.end && (
              <Typography variant="overline" sx={{ ml: "5px" }}>{`→ ${props.item.period.end}`}</Typography>
            )}
            <Typography
              variant="overline"
              sx={{ mx: "5px", fontSize: "10px", verticalAlign: "middle", lineHeight: "100%" }}
            >
              {"@"}
            </Typography>
            <Link
              color="inherit"
              underline="hover"
              rel="noreferrer"
              variant="overline"
              target="_blank"
              href={props.item.location.url}
            >
              {props.item.location.name}
            </Link>
          </Box>
        }
      />
    </ListItem>
  );
}
