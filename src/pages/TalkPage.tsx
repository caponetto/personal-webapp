import React, { useEffect, useState } from "react";
import { Media } from "../common/Media";
import { KeywordChips } from "../components/KeywordChips";
import { MediaPageHeader } from "../components/MediaPageHeader";
import { MediaSection } from "../components/MediaSection";
import { Page } from "../components/Page";
import { useApp } from "../context/AppContext";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export function TalkPage() {
  const app = useApp();
  const active = usePageActive();
  const keywordSelection = useKeywordSelection();
  const [filteredLives, setFilteredLives] = useState<Media[]>([]);
  const [filteredConferences, setFilteredConferences] = useState<Media[]>([]);

  useEffect(() => {
    setFilteredLives(
      app.data.talk.lives.filter(
        (media: Media) =>
          keywordSelection.selected.length === 0 ||
          media.keywords.some((keyword: string) => keywordSelection.selected.includes(keyword))
      )
    );

    setFilteredConferences(
      app.data.talk.conferences.filter(
        (media: Media) =>
          keywordSelection.selected.length === 0 ||
          media.keywords.some((keyword: string) => keywordSelection.selected.includes(keyword))
      )
    );
  }, [app.data.talk.conferences, app.data.talk.lives, keywordSelection.selected]);

  return (
    <Page>
      <MediaPageHeader fadeTime={500} type={"talks"} />
      {active && (
        <KeywordChips
          keywords={app.data.talk.keywords}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          onClearSelection={keywordSelection.onClear}
          fadeTime={500}
        />
      )}
      {active && filteredLives.length > 0 && (
        <MediaSection
          title={"Lives"}
          fadeTime={1000}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredLives.sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())}
        />
      )}
      {active && filteredConferences.length > 0 && (
        <MediaSection
          title={"Conferences"}
          fadeTime={1500}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredConferences.sort(
            (a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime()
          )}
        />
      )}
    </Page>
  );
}
