import { useMemo } from "react";
import { MediaItem } from "../schema";
import { KeywordSelection } from "./useKeywordSelection";

export function filterAndSortMedias(items: MediaItem[], selectionMap: Map<string, boolean>, isAnySelected: boolean) {
  const filteredItems = isAnySelected
    ? items.filter((item) => item.keywordKeys.some((keyword) => selectionMap.get(keyword)))
    : items;

  return [...filteredItems].sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
}

export function useFilteredMedias(items: MediaItem[], keywordSelection: KeywordSelection) {
  return useMemo(
    () => filterAndSortMedias(items, keywordSelection.selectionMap, keywordSelection.isAnySelected),
    [items, keywordSelection.isAnySelected, keywordSelection.selectionMap],
  );
}
