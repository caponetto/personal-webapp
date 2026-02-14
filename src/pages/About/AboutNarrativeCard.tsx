import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { HoverableCard } from "../../components/card";

export type AboutSectionKey = "currentWork" | "howIWork" | "background" | "focus";

export type AboutSection = Readonly<{
  key: AboutSectionKey;
  title: string;
  content: string;
}>;

type AboutNarrativeCardProps = Readonly<{
  collaborationNote: string;
  sections: AboutSection[];
}>;

const sectionIcons: Record<AboutSectionKey, ReactNode> = {
  currentWork: <EngineeringOutlinedIcon fontSize="small" />,
  howIWork: <BiotechOutlinedIcon fontSize="small" />,
  background: <HistoryEduOutlinedIcon fontSize="small" />,
  focus: <AutoAwesomeOutlinedIcon fontSize="small" />,
};

export function AboutNarrativeCard(props: AboutNarrativeCardProps) {
  return (
    <HoverableCard
      sx={{ p: { xs: 2.25, sm: 3 }, width: "100%", maxWidth: { xs: "none", lg: "74ch" }, mx: { xs: 0, lg: "auto" } }}
    >
      <Stack spacing={3}>
        {props.sections.map((section, idx) => (
          <Stack key={`about-section-${idx}`} spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Stack
                aria-hidden
                sx={{
                  color: "text.secondary",
                  lineHeight: 0,
                }}
              >
                {sectionIcons[section.key]}
              </Stack>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.02rem", sm: "1.08rem" }, lineHeight: 1.3 }}>
                {section.title}
              </Typography>
            </Stack>
            <Typography sx={{ color: "text.primary", lineHeight: 1.75, fontSize: { xs: "0.98rem", sm: "1rem" } }}>
              {section.content}
            </Typography>
          </Stack>
        ))}
        {props.collaborationNote && (
          <Typography
            sx={{
              color: "text.secondary",
              lineHeight: 1.7,
              borderTop: "1px solid",
              borderColor: "divider",
              pt: 2.1,
            }}
          >
            {props.collaborationNote}
          </Typography>
        )}
      </Stack>
    </HoverableCard>
  );
}
