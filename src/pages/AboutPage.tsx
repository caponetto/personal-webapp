import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { ReactNode } from "react";
import { AppFonts } from "../app/AppFonts";
import { HoverableCard } from "../components/HoverableCard";
import { Page } from "../components/Page";
import { SocialBar } from "../components/SocialBar";
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
              <Typography
                component="div"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontFamily: AppFonts.PHILOSOPHER,
                  fontSize: { xs: "16px", sm: "20px" },
                }}
              >
                Welcome to my personal space 👋
              </Typography>
              {app.data.about.paragraphs.map((paragraph: string, idx: number) => (
                <Paragraph key={`about-paragraph-${idx}`}>{paragraph}</Paragraph>
              ))}
            </Stack>
          </Fade>
          <CardActions disableSpacing sx={{ display: { xs: "auto", md: "none" } }}>
            <Box sx={{ width: 1 }}>
              <SocialBar sx={{ width: "150px", mx: "auto", float: "center" }} />
            </Box>
          </CardActions>
        </HoverableCard>
      )}
    </Page>
  );
}

function Paragraph(props: { children: ReactNode }) {
  return (
    <Typography component="div">
      <Box
        sx={{
          textAlign: "justify",
          lineHeight: 1.7,
          fontFamily: AppFonts.NUNITO,
          fontSize: { xs: "13px", sm: "16px" },
        }}
      >
        {props.children}
      </Box>
    </Typography>
  );
}
