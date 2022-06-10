import { useEffect, useState } from "react";
import { Media } from "../data";

export function useFilteredMedias(medias: Media[], keywords: string[]) {
  const [filteredMedias, setFilteredMedias] = useState<Media[]>([]);

  useEffect(() => {
    setFilteredMedias(
      medias
        .filter((media) => keywords.length === 0 || media.keywordKeys.some((keyword) => keywords.includes(keyword)))
        .sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime())
    );
  }, [keywords, medias]);

  return filteredMedias;
}
