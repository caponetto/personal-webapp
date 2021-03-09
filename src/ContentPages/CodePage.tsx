import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useState } from "react";
import { codeKeywordArray, Media, repositories } from "../Common/Media";
import { KeywordChips } from "../Components/KeywordChips";
import { MediaSection } from "../Components/MediaSection";
import { PageHeader } from "../Components/PageHeader";

export function CodePage() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [filteredRepositories, setFilteredRepositories] = useState<Media[]>([]);

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
    setFilteredRepositories(
      repositories.filter(
        (media: Media) =>
          selectedKeywords.length === 0 || media.keywords.some((keyword: string) => selectedKeywords.includes(keyword))
      )
    );
  }, [selectedKeywords]);

  return (
    <Box>
      <PageHeader content={"Here you can find some of my open source"} />
      <KeywordChips
        keywords={codeKeywordArray}
        selected={selectedKeywords}
        onKeywordClicked={(keyword: string) => onKeywordClicked(keyword)}
        fadeTime={500}
      />
      {filteredRepositories.length > 0 && (
        <MediaSection
          title={"Repositories"}
          fadeTime={1000}
          mediaList={filteredRepositories.sort(
            (a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime()
          )}
        />
      )}
    </Box>
  );
}
