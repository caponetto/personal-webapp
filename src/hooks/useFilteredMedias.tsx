import { useMemo } from "react";
import { Media } from "../data";
import { KeywordSelection } from "./useKeywordSelection";

export function useFilteredMedias(medias: Media[], keywordSelection: KeywordSelection) {
  return useMemo(() => {
    const filteredMedias = keywordSelection.isAnySelected
      ? medias.filter((media) => media.keywordKeys.some((keyword) => keywordSelection.selectionMap.get(keyword)))
      : medias;

    return filteredMedias.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
  }, [keywordSelection.isAnySelected, keywordSelection.selectionMap, medias]);
}
