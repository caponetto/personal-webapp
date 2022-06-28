import { useMemo } from "react";
import { MediaItem } from "../schema";
import { KeywordSelection } from "./useKeywordSelection";

export function useFilteredMedias(items: MediaItem[], keywordSelection: KeywordSelection) {
  return useMemo(() => {
    const filteredItems = keywordSelection.isAnySelected
      ? items.filter((item) => item.keywordKeys.some((keyword) => keywordSelection.selectionMap.get(keyword)))
      : items;

    return filteredItems.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
  }, [keywordSelection.isAnySelected, keywordSelection.selectionMap, items]);
}
