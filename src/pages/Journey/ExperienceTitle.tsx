import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

type ExperienceTitleProps = Readonly<{
  title: string;
}>;

export function ExperienceTitle(props: ExperienceTitleProps) {
  const { t } = useTranslation();
  const roleSteps = props.title
    .split("→")
    .map((role) => role.trim())
    .filter((role) => role.length > 0);
  const finalRole = roleSteps[roleSteps.length - 1] ?? props.title;
  const progressionLabel = roleSteps.join(" • ");

  return (
    <Box sx={{ display: "grid", rowGap: 0.35 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 0.75, rowGap: 0.5 }}>
        <Typography
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", md: "1.06rem" },
            lineHeight: 1.34,
          }}
        >
          {finalRole}
        </Typography>
        {roleSteps.length > 1 && (
          <Typography
            component="span"
            variant="caption"
            sx={{
              px: 0.75,
              py: 0.12,
              borderRadius: "999px",
              border: "1px solid",
              borderColor: "divider",
              color: "text.secondary",
              backgroundColor: "background.default",
              lineHeight: 1.2,
            }}
          >
            {t("literal:promoted")}
          </Typography>
        )}
      </Box>
      {roleSteps.length > 1 && (
        <Typography component="div" variant="caption" color="text.secondary" sx={{ lineHeight: 1.35 }}>
          {progressionLabel}
        </Typography>
      )}
    </Box>
  );
}
