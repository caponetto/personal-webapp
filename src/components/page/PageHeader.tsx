import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode } from "react";

const DEFAULT_FADE_TIME = 280;

type PageHeaderProps = Readonly<{
  fadeTime?: number;
  subtitle?: ReactNode;
  title: ReactNode;
}>;

export function PageHeader(props: PageHeaderProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <Fade in={true} timeout={reduceMotion ? 0 : (props.fadeTime ?? DEFAULT_FADE_TIME)}>
      <Stack spacing={1.25} sx={{ mb: { xs: 3, md: 4 }, maxWidth: "900px" }}>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: { xs: "1.625rem", md: "2rem" },
            lineHeight: { xs: 1.3, md: 1.25 },
            mb: 0.25,
            "@keyframes pageHeaderSlideIn": {
              from: { opacity: 0, transform: "translateY(8px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
            animation: reduceMotion ? "none" : "pageHeaderSlideIn 320ms ease-out",
          }}
        >
          {props.title}
        </Typography>
        {props.subtitle && (
          <Typography
            component="div"
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: "68ch",
              fontSize: { xs: "0.97rem", md: "1rem" },
              lineHeight: 1.55,
              "@keyframes pageHeaderSubtitleSlideIn": {
                from: { opacity: 0, transform: "translateY(6px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
              animation: reduceMotion ? "none" : "pageHeaderSubtitleSlideIn 360ms ease-out 70ms both",
            }}
          >
            {props.subtitle}
          </Typography>
        )}
      </Stack>
    </Fade>
  );
}
