import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useState } from "react";
import { conferences, lives, Media, talkKeywordArray } from "../Common/Media";
import { KeywordChips } from "../Components/KeywordChips";
import { MediaSection } from "../Components/MediaSection";
import { PageHeader } from "../Components/PageHeader";

export function TalkPage() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [filteredLives, setFilteredLives] = useState<Media[]>([]);
  const [filteredConferences, setFilteredConferences] = useState<Media[]>([]);

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
    setFilteredLives(
      lives.filter(
        (media: Media) =>
          selectedKeywords.length === 0 || media.keywords.some((keyword: string) => selectedKeywords.includes(keyword))
      )
    );

    setFilteredConferences(
      conferences.filter(
        (media: Media) =>
          selectedKeywords.length === 0 || media.keywords.some((keyword: string) => selectedKeywords.includes(keyword))
      )
    );
  }, [selectedKeywords]);

  return (
    <Box>
      <PageHeader content={"Here you can find some of my talks"} />
      <KeywordChips
        keywords={talkKeywordArray}
        selected={selectedKeywords}
        onKeywordClicked={(keyword: string) => onKeywordClicked(keyword)}
        fadeTime={500}
      />
      {filteredLives.length > 0 && (
        <MediaSection
          title={"Lives"}
          fadeTime={1000}
          mediaList={filteredLives.sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())}
        />
      )}
      {filteredConferences.length > 0 && (
        <MediaSection
          title={"Conferences"}
          fadeTime={1500}
          mediaList={filteredConferences.sort(
            (a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime()
          )}
        />
      )}
    </Box>
  );
}
