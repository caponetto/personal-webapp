import React, { useEffect, useState } from "react";
import { Media } from "../common/Media";
import { KeywordChips } from "../components/KeywordChips";
import { MediaPageHeader } from "../components/MediaPageHeader";
import { MediaSection } from "../components/MediaSection";
import { Page } from "../components/Page";
import { useApp } from "../context/AppContext";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export function TextPage() {
  const app = useApp();
  const active = usePageActive();
  const keywordSelection = useKeywordSelection();
  const [includeMasterThesis, setIncludeMasterThesis] = useState(true);
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<Media[]>([]);

  useEffect(() => {
    setIncludeMasterThesis(
      keywordSelection.selected.length === 0 ||
        app.data.text.masterThesis.keywords.some((keyword: string) => keywordSelection.selected.includes(keyword))
    );

    setFilteredBlogPosts(
      app.data.text.blogPosts.filter(
        (media: Media) =>
          keywordSelection.selected.length === 0 ||
          media.keywords.some((keyword: string) => keywordSelection.selected.includes(keyword))
      )
    );
  }, [app.data.text.blogPosts, app.data.text.masterThesis.keywords, keywordSelection.selected]);

  return (
    <Page>
      <MediaPageHeader fadeTime={500} type={"texts"} />
      {active && (
        <KeywordChips
          keywords={app.data.text.keywords}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          onClearSelection={keywordSelection.onClear}
          fadeTime={500}
        />
      )}
      {active && includeMasterThesis && (
        <MediaSection
          title={"Master's thesis"}
          fadeTime={1000}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={[app.data.text.masterThesis]}
        />
      )}
      {active && filteredBlogPosts.length > 0 && (
        <MediaSection
          title={"Blog posts"}
          fadeTime={1500}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredBlogPosts.sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())}
        />
      )}
    </Page>
  );
}
