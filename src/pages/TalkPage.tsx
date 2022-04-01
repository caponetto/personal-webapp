import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../components/chip";
import { MediaSection, Page, PageHeader } from "../components/page";
import { useApp } from "../context/AppContext";
import { Media } from "../data";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export default function TalkPage() {
  const app = useApp();
  const active = usePageActive();
  const { t } = useTranslation();

  const talkKeywords = useMemo(() => {
    const liveKeywords = app.data.talk.lives.reduce((acc: string[], live) => acc.concat(live.keywordKeys), []);
    const conferenceKeywords = app.data.talk.conferences.reduce(
      (acc: string[], conference) => acc.concat(conference.keywordKeys),
      []
    );
    return [...new Set([...liveKeywords, ...conferenceKeywords])];
  }, [app.data.talk.conferences, app.data.talk.lives]);

  const keywordSelection = useKeywordSelection(talkKeywords);
  const [filteredLives, setFilteredLives] = useState<Media[]>([]);
  const [filteredConferences, setFilteredConferences] = useState<Media[]>([]);

  useEffect(() => {
    setFilteredLives(
      app.data.talk.lives
        .filter(
          (media: Media) =>
            keywordSelection.selected.length === 0 ||
            media.keywordKeys.some((keyword: string) => keywordSelection.selected.includes(keyword))
        )
        .sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())
    );

    setFilteredConferences(
      app.data.talk.conferences
        .filter(
          (media: Media) =>
            keywordSelection.selected.length === 0 ||
            media.keywordKeys.some((keyword: string) => keywordSelection.selected.includes(keyword))
        )
        .sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())
    );
  }, [app.data.talk.conferences, app.data.talk.lives, keywordSelection.selected]);

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
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          onClearSelection={keywordSelection.onClear}
          fadeTime={500}
        />
      )}
      {active && filteredLives.length > 0 && (
        <MediaSection
          title={t("literal:lives")}
          fadeTime={1000}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredLives}
        />
      )}
      {active && filteredConferences.length > 0 && (
        <MediaSection
          title={t("literal:conferences")}
          fadeTime={1500}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredConferences}
        />
      )}
    </Page>
  );
}
