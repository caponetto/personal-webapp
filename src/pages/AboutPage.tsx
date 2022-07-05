import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { HoverableCard } from "../components/card";
import { Page } from "../components/page";
import { SocialBar } from "../components/social";
import { useApp } from "../context/AppContext";
import { Fonts } from "../fonts";
import { usePageActive } from "../hooks/usePageActive";
import { routes } from "../routes";

const FADE_TIME = {
  card: 500,
};

export default function AboutPage() {
  const app = useApp();
  const active = usePageActive(0);

  return (
    <Page name={"about"}>
      {active && (
        <Fade in={true} timeout={FADE_TIME.card}>
          <div>
            <HoverableCard sx={{ p: "28px", width: { xs: "100%", xl: "1170px" }, margin: "0 auto" }}>
              <Stack spacing={4}>
                <Typography
                  component="div"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontFamily: Fonts.PHILOSOPHER,
                    fontSize: { xs: "16px", sm: "20px" },
                  }}
                >
                  {app.schema.about.welcome}
                </Typography>
                {app.schema.about.paragraphs.map((paragraph: string, idx: number) => (
                  <Paragraph key={`about-paragraph-${idx}`}>{paragraph}</Paragraph>
                ))}
              </Stack>
              <CardActions disableSpacing sx={{ display: { xs: "auto", md: "none" } }}>
                <Box sx={{ width: 1 }}>
                  <SocialBar sx={{ width: "150px", mx: "auto", float: "center" }} urls={routes.urls.social} />
                </Box>
              </CardActions>
            </HoverableCard>
          </div>
        </Fade>
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
          fontFamily: Fonts.NUNITO,
          fontSize: { xs: "13px", sm: "16px" },
        }}
      >
        {props.children}
      </Box>
    </Typography>
  );
}
