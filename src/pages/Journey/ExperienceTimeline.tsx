import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { alpha } from "@mui/material/styles";
import { JourneyItem } from "../../schema";
import { JourneyLocationLink } from "./JourneyLocationLink";

type ExperienceTimelineProps = Readonly<{
  items: JourneyItem[];
}>;

export function ExperienceTimeline(props: ExperienceTimelineProps) {
  const parseRoleSteps = (title: string) =>
    title
      .split("→")
      .map((step) => step.trim())
      .filter((step) => step.length > 0);

  return (
    <Timeline
      position="right"
      sx={{
        m: 0,
        p: 0,
        alignItems: "flex-start",
        "& .MuiTimelineItem-root:before": {
          display: "none",
        },
        "& .MuiTimelineConnector-root": {
          bgcolor: "divider",
          width: 2,
        },
        "@keyframes currentExperienceGlow": {
          "0%, 100%": {
            boxShadow:
              "0 0 0 0 var(--current-role-ring), 0 0 0 0 var(--current-role-glow), 0 0 0 0 var(--current-role-halo)",
          },
          "50%": {
            boxShadow:
              "0 0 0 2px var(--current-role-ring), 0 0 9px var(--current-role-glow), 0 0 0 5px var(--current-role-halo)",
          },
        },
      }}
    >
      {props.items.map((item, index) => {
        const isCurrentRole = typeof item.period.end === "string";
        const roleSteps = parseRoleSteps(item.title);
        const finalRole = roleSteps[roleSteps.length - 1] ?? item.title;
        const priorRoles = roleSteps
          .slice(0, -1)
          .filter((role) => role !== finalRole)
          .reverse();
        const hasProgression = priorRoles.length > 0;
        const showConnector = index < props.items.length - 1;
        const periodLabel = item.period.end
          ? `${item.period.start} \u2192 ${item.period.end}`
          : String(item.period.start);

        return (
          <TimelineItem key={item.id} sx={{ minHeight: 0, mb: showConnector ? 1.1 : 0 }}>
            <TimelineSeparator>
              <TimelineDot
                color={isCurrentRole ? "primary" : "grey"}
                variant={isCurrentRole ? "filled" : "outlined"}
                sx={{
                  mt: 0.7,
                  mb: 0.45,
                  boxShadow: "none",
                  ...(isCurrentRole && {
                    "--current-role-ring": (theme) => alpha(theme.palette.primary.main, 0.2),
                    "--current-role-glow": (theme) => alpha(theme.palette.primary.main, 0.55),
                    "--current-role-halo": (theme) => alpha(theme.palette.primary.main, 0.28),
                    boxShadow: (theme) =>
                      `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}, 0 0 12px ${alpha(theme.palette.primary.main, 0.55)}, 0 0 0 7px ${alpha(theme.palette.primary.main, 0.28)}`,
                    animation: "currentExperienceGlow 1.8s ease-in-out infinite",
                    "@media (prefers-reduced-motion: reduce)": {
                      animation: "none",
                    },
                  }),
                }}
              />
              {showConnector && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: 0.45, px: 1.6, mt: 0.05 }}>
              <Stack spacing={0.45}>
                <Typography
                  variant="overline"
                  sx={{ color: "text.secondary", lineHeight: 1.2, letterSpacing: "0.07em", fontSize: "0.68rem" }}
                >
                  {periodLabel}
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: { xs: "1rem", md: "1.06rem" }, lineHeight: 1.3 }}>
                  {finalRole}
                </Typography>
                {hasProgression && (
                  <Box
                    component="ul"
                    sx={{
                      m: 0,
                      pl: 1.65,
                      color: "text.secondary",
                      "& li": { mb: 0.15 },
                      "& li:last-of-type": { mb: 0 },
                    }}
                  >
                    {priorRoles.map((step) => (
                      <Typography key={step} component="li" variant="caption" sx={{ lineHeight: 1.3 }}>
                        {step}
                      </Typography>
                    ))}
                  </Box>
                )}
                <Typography
                  component="div"
                  variant="overline"
                  sx={{ color: "text.secondary", letterSpacing: "0.08em", fontSize: "0.73rem", lineHeight: 1.3 }}
                >
                  {"@ "}
                  <JourneyLocationLink name={item.location.name} url={item.location.url} variant="inherit" />
                </Typography>
              </Stack>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
