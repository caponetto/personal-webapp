import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MediaItem } from "../schema";
import { prepareKeywordsQueryParam, useQueryParamKeywords } from "./useQueryParam";

export interface KeywordSelection {
  selectionMap: Map<string, boolean>;
  onToggleSelection: (keyword: string) => void;
  onClearSelection: () => void;
  isAnySelected: boolean;
}

export function buildInitialSelectionMap(...arrayOfArrays: MediaItem[][]): Map<string, boolean> {
  const initialSelectionMap = new Map<string, boolean>();
  arrayOfArrays.forEach((items: MediaItem[]) => {
    items.forEach((item: MediaItem) => {
      item.keywordKeys.forEach((keyword: string) => {
        if (!initialSelectionMap.has(keyword)) {
          initialSelectionMap.set(keyword, false);
        }
      });
    });
  });
  return initialSelectionMap;
}

function synchronizeSelectionMap(selectionMap: Map<string, boolean>, queryKeywords: Set<string>) {
  let changed = false;
  const nextState = new Map(selectionMap);

  for (const [keyword, isSelected] of selectionMap.entries()) {
    const shouldBeSelected = queryKeywords.has(keyword);
    if (isSelected !== shouldBeSelected) {
      nextState.set(keyword, shouldBeSelected);
      changed = true;
    }
  }

  return changed ? nextState : selectionMap;
}

export function useKeywordSelection(...arrayOfArrays: MediaItem[][]): KeywordSelection {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParamKeywords = useQueryParamKeywords();
  const queryKeywords = useMemo(() => new Set(queryParamKeywords), [queryParamKeywords]);
  const lastRequestedSearchRef = useRef(location.search);

  const [internalSelectionMap, setInternalSelectionMap] = useState(() => {
    const map = buildInitialSelectionMap(...arrayOfArrays);
    queryParamKeywords.forEach((k) => {
      if (map.has(k)) {
        map.set(k, true);
      }
    });
    return map;
  });

  const expectedSearchForInternalState = useMemo(() => {
    const selectedKeywords = [...internalSelectionMap.entries()]
      .filter(([, isSelected]) => isSelected)
      .map(([keyword]) => keyword);
    return selectedKeywords.length > 0 ? `?${prepareKeywordsQueryParam(selectedKeywords)}` : "";
  }, [internalSelectionMap]);

  const hasExternalSearchUpdate =
    location.search !== expectedSearchForInternalState && location.search !== lastRequestedSearchRef.current;

  const selectionMap = useMemo(
    () =>
      hasExternalSearchUpdate ? synchronizeSelectionMap(internalSelectionMap, queryKeywords) : internalSelectionMap,
    [hasExternalSearchUpdate, internalSelectionMap, queryKeywords],
  );

  const selected = useMemo(
    () => [...selectionMap.entries()].filter(([, isSelected]) => isSelected).map(([keyword]) => keyword),
    [selectionMap],
  );

  const isAnySelected = useMemo(() => selected.length > 0, [selected]);

  const onToggleSelection = useCallback(
    (keyword: string) => {
      setInternalSelectionMap((prevState) => {
        const source = hasExternalSearchUpdate ? synchronizeSelectionMap(prevState, queryKeywords) : prevState;
        if (!source.has(keyword)) {
          return source;
        }
        const isSelected = !!source.get(keyword);
        return new Map([...source.entries(), [keyword, !isSelected]]);
      });
    },
    [hasExternalSearchUpdate, queryKeywords],
  );

  const onClearSelection = useCallback(() => {
    setInternalSelectionMap((prevState) => {
      const source = hasExternalSearchUpdate ? synchronizeSelectionMap(prevState, queryKeywords) : prevState;
      const newMap = new Map(source);
      [...newMap.keys()].forEach((keyword) => newMap.set(keyword, false));
      return newMap;
    });
  }, [hasExternalSearchUpdate, queryKeywords]);

  useEffect(() => {
    const nextSearch = isAnySelected ? `?${prepareKeywordsQueryParam(selected)}` : "";
    if (location.search === nextSearch) {
      lastRequestedSearchRef.current = location.search;
      return;
    }

    lastRequestedSearchRef.current = nextSearch;

    navigate(
      {
        search: nextSearch,
      },
      { replace: true },
    );
  }, [isAnySelected, location.search, navigate, selected]);

  return useMemo(
    () => ({
      selectionMap,
      onToggleSelection,
      onClearSelection,
      isAnySelected,
    }),
    [isAnySelected, onClearSelection, onToggleSelection, selectionMap],
  );
}
