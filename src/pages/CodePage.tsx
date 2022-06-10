import Typography from "@mui/material/Typography";
import React, { useDeferredValue, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../components/chip";
import { MediaSection, Page, PageHeader } from "../components/page";
import { useApp } from "../context/AppContext";
import { buildUniqueKeywords } from "../data";
import { useFilteredMedias } from "../hooks/useFilteredMedias";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export default function CodePage() {
  const app = useApp();
  const active = usePageActive();
  const { t } = useTranslation();
  const codeKeywords = useMemo(() => buildUniqueKeywords(app.data.code.repositories), [app.data.code.repositories]);
  const keywordSelection = useKeywordSelection(codeKeywords);
  const deferredKeywordSelected = useDeferredValue(keywordSelection.selected);
  const filteredRepositories = useFilteredMedias(app.data.code.repositories, deferredKeywordSelected);

  return (
    <Page>
      <PageHeader fadeTime={500}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="code:header">
            Here you can find some of my <strong>code</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <KeywordChips
          keywords={codeKeywords}
          selectedKeywords={deferredKeywordSelected}
          onKeywordClicked={keywordSelection.onItemClicked}
          onClearSelection={keywordSelection.onClear}
          fadeTime={500}
        />
      )}
      {active && filteredRepositories.length > 0 && (
        <MediaSection
          title={t("literal:repositories")}
          fadeTime={1000}
          selectedKeywords={deferredKeywordSelected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredRepositories}
        />
      )}
    </Page>
  );
}
