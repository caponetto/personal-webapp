import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

interface CopyrightProps {
  name: string;
}

export function Copyright(props: CopyrightProps) {
  const { t } = useTranslation();

  return (
    <Typography variant="caption" component="div" align="center">
      {t("common:copyright", {
        year: new Date().getFullYear(),
        name: props.name,
      })}
    </Typography>
  );
}
