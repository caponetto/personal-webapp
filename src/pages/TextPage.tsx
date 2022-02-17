import React, { useEffect, useState } from "react";
import { KeywordChips } from "../components/chip";
import { MediaPageHeader, MediaSection, Page } from "../components/page";
import { useApp } from "../context/AppContext";
import { Media } from "../data/Data";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export default function TextPage() {
  const app = useApp();
  const active = usePageActive();
  const keywordSelection = useKeywordSelection(app.data.text.keywords);
  const [includeMasterThesis, setIncludeMasterThesis] = useState(true);
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<Media[]>([]);

  useEffect(() => {
    setIncludeMasterThesis(
      keywordSelection.selected.length === 0 ||
        app.data.text.masterThesis.keywords.some((keyword: string) => keywordSelection.selected.includes(keyword))
    );

    setFilteredBlogPosts(
      app.data.text.blogPosts
        .filter(
          (media: Media) =>
            keywordSelection.selected.length === 0 ||
            media.keywords.some((keyword: string) => keywordSelection.selected.includes(keyword))
        )
        .sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())
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
          mediaList={filteredBlogPosts}
        />
      )}
    </Page>
  );
}
