import { renderHook } from "@testing-library/react-hooks/dom";
import { useFilteredMedias } from "../../hooks/useFilteredMedias";
import { createMedia, DEFAULT_KEYWORD_SELECTION } from "../TestBuilders";

describe("useFilteredMedias", () => {
  it("should return empty array when there is no media available", () => {
    const { result } = renderHook(() => useFilteredMedias([], DEFAULT_KEYWORD_SELECTION));
    expect(result.current).toEqual([]);
  });

  it("should return empty array when no there is no selection match", () => {
    const medias = [
      createMedia({ title: "Foo", keywordKeys: ["foo1", "foo2", "foo3"] }),
      createMedia({ title: "Bar", keywordKeys: ["bar1", "bar2", "bar3"] }),
      createMedia({ title: "Baz", keywordKeys: ["baz1", "baz2", "baz3"] }),
    ];
    const { result } = renderHook(() =>
      useFilteredMedias(medias, {
        ...DEFAULT_KEYWORD_SELECTION,
        isAnySelected: true,
        selectionMap: new Map([["unknown", true]]),
      })
    );
    expect(result.current).toEqual([]);
  });

  it("should return all medias when there is no selection", () => {
    const medias = [
      createMedia({ title: "Foo", keywordKeys: ["foo"] }),
      createMedia({ title: "Bar", keywordKeys: ["bar"] }),
    ];
    const { result } = renderHook(() =>
      useFilteredMedias(medias, { ...DEFAULT_KEYWORD_SELECTION, isAnySelected: false })
    );
    expect(result.current).toEqual(medias);
  });

  it("should return all medias sorted desc by releasedDate when there is no selection", () => {
    const foo = createMedia({ title: "Foo", keywordKeys: ["foo", "common"], releasedDate: new Date("2010-01-01") });
    const bar = createMedia({ title: "Bar", keywordKeys: ["bar", "common"], releasedDate: new Date("2020-01-01") });
    const { result } = renderHook(() =>
      useFilteredMedias([foo, bar], { ...DEFAULT_KEYWORD_SELECTION, isAnySelected: false })
    );
    expect(result.current).toEqual([bar, foo]);
  });

  it("should return filtered medias by their keywords when selected", () => {
    const foo = createMedia({ title: "Foo", keywordKeys: ["foo1", "foo2", "foo3"] });
    const bar = createMedia({ title: "Bar", keywordKeys: ["bar1", "bar2", "bar3"] });
    const baz = createMedia({ title: "Baz", keywordKeys: ["baz1", "baz2", "baz3"] });
    const { result } = renderHook(() =>
      useFilteredMedias([foo, bar, baz], {
        ...DEFAULT_KEYWORD_SELECTION,
        isAnySelected: true,
        selectionMap: new Map([
          ["foo1", false],
          ["bar1", true],
          ["baz1", true],
        ]),
      })
    );
    expect(result.current).toEqual([bar, baz]);
  });

  it("should return filtered medias by a common keyword when selected and sorted desc by releasedDate", () => {
    const foo = createMedia({ title: "Foo", keywordKeys: ["foo", "common"], releasedDate: new Date("2010-01-01") });
    const bar = createMedia({ title: "Bar", keywordKeys: ["bar", "common"], releasedDate: new Date("2020-01-01") });
    const baz = createMedia({ title: "Baz", keywordKeys: ["baz"] });
    const { result } = renderHook(() =>
      useFilteredMedias([foo, bar, baz], {
        ...DEFAULT_KEYWORD_SELECTION,
        isAnySelected: true,
        selectionMap: new Map([["common", true]]),
      })
    );
    expect(result.current).toEqual([bar, foo]);
  });
});
