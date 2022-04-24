import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

export function Copyright() {
  const app = useApp();
  const { t } = useTranslation();

  return (
    <Typography variant="caption" component="div" align="center">
      {t("common:copyright", { year: new Date().getFullYear(), name: app.data.personal.fullName })}
    </Typography>
  );
}
