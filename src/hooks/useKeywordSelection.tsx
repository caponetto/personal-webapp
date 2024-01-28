import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
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
    items
      .reduce((keywordArray: string[], m: MediaItem) => keywordArray.concat(m.keywordKeys), [])
      .forEach((keyword: string) => {
        if (!initialSelectionMap.has(keyword)) {
          initialSelectionMap.set(keyword, false);
        }
      });
  });
  return initialSelectionMap;
}

export function useKeywordSelection(...arrayOfArrays: MediaItem[][]): KeywordSelection {
  const navigate = useNavigate();
  const queryParamKeywords = useQueryParamKeywords();

  const [selectionMap, setSelectionMap] = useState(() => {
    const map = buildInitialSelectionMap(...arrayOfArrays);
    queryParamKeywords.forEach((k) => {
      if (map.has(k)) {
        map.set(k, true);
      }
    });
    return map;
  });

  const [selected, setSelected] = useState(() =>
    [...selectionMap.entries()].filter(([, isSelected]) => isSelected).map(([keyword]) => keyword),
  );

  const isAnySelected = useMemo(() => selected.length > 0, [selected]);

  const onToggleSelection = (keyword: string) => {
    if (!selectionMap.has(keyword)) {
      return;
    }
    const isSelected = !!selectionMap.get(keyword);
    setSelectionMap((prevState) => new Map([...prevState.entries(), [keyword, !isSelected]]));
    setSelected((prevState) => (isSelected ? prevState.filter((k: string) => k !== keyword) : [...prevState, keyword]));
  };

  const onClearSelection = () => {
    setSelectionMap((prevState) => {
      const newMap = new Map(prevState);
      selected.forEach((keyword) => newMap.set(keyword, false));
      return newMap;
    });
    setSelected([]);
  };

  useEffect(() => {
    navigate(
      {
        search: isAnySelected ? `?${prepareKeywordsQueryParam(selected)}` : "",
      },
      { replace: true },
    );
  }, [navigate, selected, isAnySelected]);

  return {
    selectionMap,
    onToggleSelection,
    onClearSelection,
    isAnySelected,
  };
}
