import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useState } from "react";
import { blogPosts, masterThesis, Media, textKeywordArray } from "../Common/Media";
import { KeywordChips } from "../Components/KeywordChips";
import { MediaSection } from "../Components/MediaSection";
import { PageHeader } from "../Components/PageHeader";

export function TextPage() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [includeMasterThesis, setIncludeMasterThesis] = useState(true);
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<Media[]>([]);

  const onKeywordClicked = useCallback(
    (keyword: string) => {
      if (selectedKeywords.includes(keyword)) {
        setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
      } else {
        setSelectedKeywords([...selectedKeywords, keyword]);
      }
    },
    [selectedKeywords]
  );

  useEffect(() => {
    setIncludeMasterThesis(
      selectedKeywords.length === 0 ||
        masterThesis.keywords.some((keyword: string) => selectedKeywords.includes(keyword))
    );

    setFilteredBlogPosts(
      blogPosts.filter(
        (media: Media) =>
          selectedKeywords.length === 0 || media.keywords.some((keyword: string) => selectedKeywords.includes(keyword))
      )
    );
  }, [selectedKeywords]);

  return (
    <Box>
      <PageHeader content={"Here you can find some of my written content"} />
      <KeywordChips
        keywords={textKeywordArray}
        selected={selectedKeywords}
        onKeywordClicked={(keyword: string) => onKeywordClicked(keyword)}
        fadeTime={500}
      />
      {includeMasterThesis && <MediaSection title={"Master's thesis"} fadeTime={1000} mediaList={[masterThesis]} />}
      {filteredBlogPosts.length > 0 && (
        <MediaSection
          title={"Blog posts"}
          fadeTime={1500}
          mediaList={filteredBlogPosts.sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())}
        />
      )}
    </Box>
  );
}
