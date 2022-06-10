import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { QueryParams, useQueryParamKeywords } from "./useQueryParams";

export function useKeywordSelection(availableKeywords: string[]) {
  const navigate = useNavigate();
  const initialKeywords = useQueryParamKeywords(availableKeywords);
  const [selected, setSelected] = useState<string[]>(initialKeywords ?? []);

  const onItemClicked = (keyword: string) => {
    if (!availableKeywords.includes(keyword)) {
      return;
    }

    const updatedSelection = selected.includes(keyword)
      ? selected.filter((k: string) => k !== keyword)
      : [...selected, keyword];
    setSelected(updatedSelection);
  };

  const onClear = () => {
    setSelected([]);
  };

  useEffect(() => {
    navigate(
      {
        search: selected.length > 0 ? `?${QueryParams.KEYWORDS}=${selected.join(",")}` : "",
      },
      { replace: true }
    );
  }, [navigate, selected]);

  return {
    selected,
    onItemClicked,
    onClear,
  };
}
