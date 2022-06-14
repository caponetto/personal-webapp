import Typography from "@mui/material/Typography";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../components/chip";
import { MediaSection, Page, PageHeader } from "../components/page";
import { useApp } from "../context/AppContext";
import { useFilteredMedias } from "../hooks/useFilteredMedias";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export default function CodePage() {
  const app = useApp();
  const active = usePageActive(0);
  const { t } = useTranslation();
  const keywordSelection = useKeywordSelection(app.data.code.repositories);
  const filteredRepositories = useFilteredMedias(app.data.code.repositories, keywordSelection);

  return (
    <Page name="code">
      <PageHeader fadeTime={500}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="code:header">
            Here you can find some of my <strong>code</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && <KeywordChips fadeTime={500} keywordSelection={keywordSelection} />}
      {active && filteredRepositories.length > 0 && (
        <MediaSection
          title={t("literal:repositories")}
          fadeTime={1000}
          keywordSelection={keywordSelection}
          mediaList={filteredRepositories}
        />
      )}
    </Page>
  );
}
