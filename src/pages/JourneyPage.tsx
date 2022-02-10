import ConstructionIcon from "@mui/icons-material/Construction";
import LaunchIcon from "@mui/icons-material/Launch";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { ReactNode } from "react";
import { Journey } from "../common/Journey";
import { routes } from "../common/Routes";
import { HoverableCard } from "../components/HoverableCard";
import { Page } from "../components/Page";
import { PageHeader } from "../components/PageHeader";
import { useApp } from "../context/AppContext";
import { usePageActive } from "../hooks/usePageActive";

type JourneyKind = "education" | "certifications" | "toolbox" | "experience";

export default function JourneyPage() {
  const app = useApp();
  const active = usePageActive();

  return (
    <Page>
      <PageHeader fadeTime={500}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          Here you can see my <strong>journey</strong> summary
        </Typography>
      </PageHeader>
      {active && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            <Grid container spacing={2}>
              <Fade in={true} timeout={1000}>
                <Grid item xs={12} xl={6}>
                  <JourneyCard
                    title={"Education"}
                    icon={<SchoolIcon />}
                    content={<JourneyList kind={"education"} items={app.data.journey.education} />}
                  />
                </Grid>
              </Fade>
              <Fade in={true} timeout={1500}>
                <Grid item xs={12} xl={6}>
                  <JourneyCard
                    title={"Certifications"}
                    icon={<VerifiedIcon />}
                    content={<JourneyList kind={"certifications"} items={app.data.journey.certification} />}
                  />
                </Grid>
              </Fade>
              <Fade in={true} timeout={2000}>
                <Grid item xs={12}>
                  <JourneyCard
                    title={"Toolbox"}
                    icon={<ConstructionIcon />}
                    content={
                      <Grid container spacing={1}>
                        {app.data.journey.toolbox.map((skill: string, idx: number) => (
                          <Grid item key={`skill-${idx}`}>
                            <Chip label={skill} color={"default"} variant={"outlined"} size={"small"} />
                          </Grid>
                        ))}
                      </Grid>
                    }
                  />
                </Grid>
              </Fade>
            </Grid>
          </Grid>
          <Fade in={true} timeout={2500}>
            <Grid item xs={12} lg={5}>
              <JourneyCard
                title={"Experience"}
                icon={<WorkIcon />}
                content={<JourneyList kind={"experience"} items={app.data.journey.experience} />}
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
  return (
    <HoverableCard>
      <CardHeader avatar={props.icon} title={<Typography sx={{ fontSize: "18px" }}>{props.title}</Typography>} />
      <CardContent>{props.content}</CardContent>
      <CardActions sx={{ pt: 0, px: "16px" }}>
        <Box sx={{ width: 1 }}>
          <Button
            id={`${props.title}-more-details-button`}
            sx={{ float: "right" }}
            size="small"
            endIcon={<LaunchIcon />}
            color="success"
            onClick={() => window.open(routes.urls.linkedin, "_blank")}
          >
            {"More Details"}
          </Button>
        </Box>
      </CardActions>
    </HoverableCard>
  );
}

interface JourneyListProps {
  kind: JourneyKind;
  items: Journey[];
}

function JourneyList(props: JourneyListProps) {
  return (
    <List dense={true}>
      {props.items.map((item: Journey, idx: number) => (
        <JourneyListItem key={`${props.kind}-item-${idx}`} item={item} />
      ))}
    </List>
  );
}

interface JourneyListItemProps {
  item: Journey;
}

function JourneyListItem(props: JourneyListItemProps) {
  return (
    <ListItem>
      <ListItemText
        primary={props.item.title}
        secondary={
          <Box component="span">
            <Typography variant="overline">{props.item.period.start}</Typography>
            {props.item.period.end && (
              <Typography variant="overline" sx={{ ml: "5px" }}>{`→ ${props.item.period.end}`}</Typography>
            )}
            <Typography
              variant="overline"
              sx={{ mx: "5px", fontSize: "10px", verticalAlign: "middle", lineHeight: "100%" }}
            >
              {"@"}
            </Typography>
            <Typography variant="overline">{props.item.location}</Typography>
          </Box>
        }
      />
    </ListItem>
  );
}
