import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { QueryParams, useQueryParamKeywords } from "./useQueryParams";

export function useKeywordSelection(availableKeywords: string[]) {
  const history = useHistory();
  const initialKeywords = useQueryParamKeywords(availableKeywords);
  const [selected, setSelected] = useState<string[]>(initialKeywords ?? []);

  const onItemClicked = useCallback(
    (keyword: string) => {
      if (!availableKeywords.includes(keyword)) {
        return;
      }

      const updatedSelection = selected.includes(keyword)
        ? selected.filter((k: string) => k !== keyword)
        : [...selected, keyword];
      setSelected(updatedSelection);
    },
    [availableKeywords, selected]
  );

  const onClear = useCallback(() => {
    setSelected([]);
  }, []);

  useEffect(() => {
    history.replace({
      search: selected.length > 0 ? `?${QueryParams.KEYWORDS}=${selected.join(",")}` : "",
    });
  }, [history, selected]);

  return {
    selected,
    onItemClicked,
    onClear,
  };
}
