import { useMemo } from "react";
import { Media } from "../data";
import { KeywordSelection } from "./useKeywordSelection";

const sortByReleaseDate = (a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime();

export function useFilteredMedias(medias: Media[], keywordSelection: KeywordSelection) {
  return useMemo(() => {
    if (!keywordSelection.isAnySelected) {
      return medias.sort(sortByReleaseDate);
    }
    return medias
      .filter((media) => media.keywordKeys.some((keyword) => keywordSelection.selectionMap.get(keyword)))
      .sort(sortByReleaseDate);
  }, [keywordSelection.isAnySelected, keywordSelection.selectionMap, medias]);
}
