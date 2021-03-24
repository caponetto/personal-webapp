import { useCallback, useState } from "react";

export function useKeywordSelection() {
  const [selected, setSelected] = useState<string[]>([]);

  const onItemClicked = useCallback(
    (keyword: string) => {
      if (selected.includes(keyword)) {
        setSelected(selected.filter((k: string) => k !== keyword));
      } else {
        setSelected([...selected, keyword]);
      }
    },
    [selected]
  );

  const onClear = useCallback(() => {
    setSelected([]);
  }, []);

  return {
    selected,
    onItemClicked,
    onClear,
  };
}
