import { useEffect, useState } from "react";
import { Media } from "../data";
import { KeywordSelection } from "./useKeywordSelection";

export function useFilteredMedias(medias: Media[], keywordSelection: KeywordSelection) {
  const [filteredMedias, setFilteredMedias] = useState<Media[]>([]);

  useEffect(() => {
    setFilteredMedias(
      medias
        .filter(
          (media) =>
            !keywordSelection.isAnySelected ||
            media.keywordKeys.some((keyword) => keywordSelection.selectionMap.get(keyword))
        )
        .sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime())
    );
  }, [keywordSelection.isAnySelected, keywordSelection.selectionMap, medias]);

  return filteredMedias;
}
