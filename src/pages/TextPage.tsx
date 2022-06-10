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

export default function TextPage() {
  const app = useApp();
  const active = usePageActive();
  const { t } = useTranslation();
  const textKeywords = useMemo(
    () => buildUniqueKeywords(app.data.text.mastersThesis, app.data.text.blogPosts),
    [app.data.text.mastersThesis, app.data.text.blogPosts]
  );
  const keywordSelection = useKeywordSelection(textKeywords);
  const deferredKeywordSelected = useDeferredValue(keywordSelection.selected);
  const filteredMasterThesis = useFilteredMedias(app.data.text.mastersThesis, deferredKeywordSelected);
  const filteredBlogPosts = useFilteredMedias(app.data.text.blogPosts, deferredKeywordSelected);

  return (
    <Page>
      <PageHeader fadeTime={500}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="text:header">
            Here you can find some of my <strong>texts</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <KeywordChips
          keywords={textKeywords}
          selectedKeywords={deferredKeywordSelected}
          onKeywordClicked={keywordSelection.onItemClicked}
          onClearSelection={keywordSelection.onClear}
          fadeTime={500}
        />
      )}
      {active && filteredMasterThesis.length > 0 && (
        <MediaSection
          title={t("literal:mastersThesis")}
          fadeTime={1000}
          selectedKeywords={deferredKeywordSelected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredMasterThesis}
        />
      )}
      {active && filteredBlogPosts.length > 0 && (
        <MediaSection
          title={t("literal:blogPosts")}
          fadeTime={1500}
          selectedKeywords={deferredKeywordSelected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredBlogPosts}
        />
      )}
    </Page>
  );
}
