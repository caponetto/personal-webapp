import React, { useEffect, useState } from "react";
import { Media } from "../common/Media";
import { KeywordChips } from "../components/KeywordChips";
import { MediaPageHeader } from "../components/MediaPageHeader";
import { MediaSection } from "../components/MediaSection";
import { Page } from "../components/Page";
import { useApp } from "../context/AppContext";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export default function CodePage() {
  const app = useApp();
  const active = usePageActive();
  const keywordSelection = useKeywordSelection(app.data.code.keywords);
  const [filteredRepositories, setFilteredRepositories] = useState<Media[]>([]);

  useEffect(() => {
    setFilteredRepositories(
      app.data.code.repositories
        .filter(
          (media: Media) =>
            keywordSelection.selected.length === 0 ||
            media.keywords.some((keyword: string) => keywordSelection.selected.includes(keyword))
        )
        .sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())
    );
  }, [app.data.code.repositories, keywordSelection.selected]);

  return (
    <Page>
      <MediaPageHeader fadeTime={500} type={"code"} />
      {active && (
        <KeywordChips
          keywords={app.data.code.keywords}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          onClearSelection={keywordSelection.onClear}
          fadeTime={500}
        />
      )}
      {active && filteredRepositories.length > 0 && (
        <MediaSection
          title={"Repositories"}
          fadeTime={1000}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredRepositories}
        />
      )}
    </Page>
  );
}
