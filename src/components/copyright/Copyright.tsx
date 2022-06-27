import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

export function Copyright() {
  const app = useApp();
  const { t } = useTranslation();

  return (
    <Typography variant="caption" component="div" align="center">
      {t("common:copyright", {
        year: new Date().getFullYear(),
        name: `${app.schema.personal.firstName} ${app.schema.personal.lastName}`,
      })}
    </Typography>
  );
}
