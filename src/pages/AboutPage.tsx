import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { ReactNode } from "react";
import { HoverableCard } from "../components/HoverableCard";
import { LinkedInButton } from "../components/LinkedInButton";
import { Page } from "../components/Page";
import { TwitterButton } from "../components/TwitterButton";
import { useApp } from "../context/AppContext";
import { usePageActive } from "../hooks/usePageActive";

export default function AboutPage() {
  const app = useApp();
  const active = usePageActive();

  return (
    <Page>
      {active && (
        <HoverableCard sx={{ p: "28px", width: { xs: "100%", xl: "1170px" }, margin: "0 auto" }}>
          <Fade in={true} timeout={500}>
            <Stack spacing={4}>
              <Typography variant="h6" sx={{ fontWeight: "normal" }}>
                Hi, there! 👋
              </Typography>
              <Paragraph>
                My name is{" "}
                <Box display="inline" fontWeight="bold">
                  {app.data.personal.fullName}
                </Box>
                . Welcome to my personal space!
              </Paragraph>
              {app.data.about.paragraphs.map((paragraph: string, idx: number) => (
                <Paragraph key={`about-paragraph-${idx}`}>{paragraph}</Paragraph>
              ))}
              <Box>
                <Typography sx={{ mb: "30px" }} component="div">
                  Here is a list of things that I have worked with the most:
                </Typography>
                <Grid container spacing={1}>
                  {app.data.about.skills.map((skill: string, idx: number) => (
                    <Grid item key={`skill-${idx}`}>
                      <Chip label={skill} color={"default"} variant={"outlined"} size={"small"} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Paragraph>Feel free to reach out to me on my social networks. 😉</Paragraph>
            </Stack>
          </Fade>
          <CardActions disableSpacing sx={{ pl: 0, display: { xs: "auto", md: "none" } }}>
            <Stack spacing={2} direction="row">
              <TwitterButton disableSpacing />
              <LinkedInButton disableSpacing />
            </Stack>
          </CardActions>
        </HoverableCard>
      )}
    </Page>
  );
}

function Paragraph(props: { children: ReactNode }) {
  return (
    <Typography component="div">
      <Box sx={{ lineHeight: 1.7 }}>{props.children}</Box>
    </Typography>
  );
}
