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

export default function TalkPage() {
  const app = useApp();
  const active = usePageActive();
  const { t } = useTranslation();
  const talkKeywords = useMemo(
    () => buildUniqueKeywords(app.data.talk.lives, app.data.talk.conferences),
    [app.data.talk.conferences, app.data.talk.lives]
  );
  const keywordSelection = useKeywordSelection(talkKeywords);
  const deferredKeywordSelected = useDeferredValue(keywordSelection.selected);
  const filteredLives = useFilteredMedias(app.data.talk.lives, deferredKeywordSelected);
  const filteredConferences = useFilteredMedias(app.data.talk.conferences, deferredKeywordSelected);

  return (
    <Page>
      <PageHeader fadeTime={500}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="talk:header">
            Here you can find some of my <strong>talks</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <KeywordChips
          keywords={talkKeywords}
          selectedKeywords={deferredKeywordSelected}
          onKeywordClicked={keywordSelection.onItemClicked}
          onClearSelection={keywordSelection.onClear}
          fadeTime={500}
        />
      )}
      {active && filteredLives.length > 0 && (
        <MediaSection
          title={t("literal:lives")}
          fadeTime={1000}
          selectedKeywords={deferredKeywordSelected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredLives}
        />
      )}
      {active && filteredConferences.length > 0 && (
        <MediaSection
          title={t("literal:conferences")}
          fadeTime={1500}
          selectedKeywords={deferredKeywordSelected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredConferences}
        />
      )}
    </Page>
  );
}
