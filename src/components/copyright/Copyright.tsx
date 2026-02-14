import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

type CopyrightProps = Readonly<{
  name: string;
}>;

export function Copyright(props: CopyrightProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const yearLabel = `2022-${currentYear}`;

  return (
    <Typography variant="caption" component="div" align="center" color="text.secondary">
      {t("common:copyright", {
        year: yearLabel,
        name: props.name,
      })}
    </Typography>
  );
}
