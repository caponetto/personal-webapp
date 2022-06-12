import { act, renderHook } from "@testing-library/react-hooks/dom";
import * as router from "react-router";
import { buildInitialSelectionMap, useKeywordSelection } from "../../hooks/useKeywordSelection";
import { useQueryParamKeywords } from "../../hooks/useQueryParam";
import { createMedia } from "../TestBuilders";

jest.spyOn(router, "useNavigate").mockReturnValue(jest.fn());

jest.mock("../../hooks/useQueryParam");
const mockUseQueryParamKeywords = useQueryParamKeywords as jest.MockedFunction<typeof useQueryParamKeywords>;

describe("useKeywordSelection :: buildInitialSelectionMap", () => {
  it("should build an empty map when there is no media", () => {
    const selectionMap = buildInitialSelectionMap([]);
    expect(selectionMap).toEqual(new Map());
  });

  it("should build an empty map when there are no keywords", () => {
    const media1 = createMedia({ title: "Media 1" });
    const media2 = createMedia({ title: "Media 2" });
    const media3 = createMedia({ title: "Media 3" });

    const selectionMap = buildInitialSelectionMap([media1, media2], [media3]);

    expect(selectionMap).toEqual(new Map());
  });

  it("should build initial selection map accordingly", () => {
    const media1 = createMedia({ title: "Media 1", keywordKeys: ["TypeScript", "ReactJS"] });
    const media2 = createMedia({ title: "Media 2", keywordKeys: ["TypeScript", "ReactJS", "Machine Learning"] });
    const media3 = createMedia({ title: "Media 3", keywordKeys: ["Quarkus", "TensorFlow"] });
    const expectedInitialSelectionMap = new Map([
      ["TypeScript", false],
      ["ReactJS", false],
      ["Machine Learning", false],
      ["Quarkus", false],
      ["TensorFlow", false],
    ]);

    const selectionMap = buildInitialSelectionMap([media1, media2], [media3]);

    expect(selectionMap).toEqual(expectedInitialSelectionMap);
  });
});

describe("useKeywordSelection :: useKeywordSelection", () => {
  it("should initialize the KeywordSelection with all entries unselected", () => {
    mockUseQueryParamKeywords.mockReturnValueOnce([]);

    const media1 = createMedia({ title: "Media 1", keywordKeys: ["TypeScript", "ReactJS"] });
    const media2 = createMedia({ title: "Media 2", keywordKeys: ["TypeScript", "ReactJS", "Machine Learning"] });
    const media3 = createMedia({ title: "Media 3", keywordKeys: ["Quarkus", "TensorFlow"] });
    const expectedSelectionMap = new Map([
      ["TypeScript", false],
      ["ReactJS", false],
      ["Machine Learning", false],
      ["Quarkus", false],
      ["TensorFlow", false],
    ]);

    const { result } = renderHook(() => useKeywordSelection([media1, media2], [media3]));
    expect(result.current.isAnySelected).toBeFalsy();
    expect(result.current.selectionMap).toEqual(expectedSelectionMap);
  });

  it("should initialize the KeywordSelection with selected keywords that match with query param", () => {
    mockUseQueryParamKeywords.mockReturnValueOnce(["Machine Learning", "TensorFlow"]);

    const media1 = createMedia({ title: "Media 1", keywordKeys: ["TypeScript", "ReactJS"] });
    const media2 = createMedia({ title: "Media 2", keywordKeys: ["TypeScript", "ReactJS", "Machine Learning"] });
    const media3 = createMedia({ title: "Media 3", keywordKeys: ["Quarkus", "TensorFlow"] });
    const expectedSelectionMap = new Map([
      ["TypeScript", false],
      ["ReactJS", false],
      ["Machine Learning", true],
      ["Quarkus", false],
      ["TensorFlow", true],
    ]);

    const { result } = renderHook(() => useKeywordSelection([media1, media2], [media3]));
    expect(result.current.isAnySelected).toBeTruthy();
    expect(result.current.selectionMap).toEqual(expectedSelectionMap);
  });

  it("should not select anything when the selection map does not have the given keyword in onItemSelected", () => {
    mockUseQueryParamKeywords.mockReturnValueOnce([]);

    const media1 = createMedia({ title: "Media 1", keywordKeys: ["TypeScript", "ReactJS"] });
    const media2 = createMedia({ title: "Media 2", keywordKeys: ["TypeScript", "ReactJS", "Machine Learning"] });
    const media3 = createMedia({ title: "Media 3", keywordKeys: ["Quarkus", "TensorFlow"] });
    const expectedSelectionMap = new Map([
      ["TypeScript", false],
      ["ReactJS", false],
      ["Machine Learning", false],
      ["Quarkus", false],
      ["TensorFlow", false],
    ]);

    const { result } = renderHook(() => useKeywordSelection([media1, media2], [media3]));
    expect(result.current.isAnySelected).toBeFalsy();

    act(() => {
      result.current.onItemSelected("Inexistent Keyword");
    });

    expect(result.current.isAnySelected).toBeFalsy();
    expect(result.current.selectionMap).toEqual(expectedSelectionMap);
  });

  it("should select keywords through onItemSelected accordingly", () => {
    mockUseQueryParamKeywords.mockReturnValueOnce([]);

    const media1 = createMedia({ title: "Media 1", keywordKeys: ["TypeScript", "ReactJS"] });
    const media2 = createMedia({ title: "Media 2", keywordKeys: ["TypeScript", "ReactJS", "Machine Learning"] });
    const media3 = createMedia({ title: "Media 3", keywordKeys: ["Quarkus", "TensorFlow"] });
    const expectedSelectionMap = new Map([
      ["TypeScript", false],
      ["ReactJS", true],
      ["Machine Learning", false],
      ["Quarkus", true],
      ["TensorFlow", false],
    ]);

    const { result } = renderHook(() => useKeywordSelection([media1, media2], [media3]));
    expect(result.current.isAnySelected).toBeFalsy();

    act(() => {
      result.current.onItemSelected("Quarkus");
      result.current.onItemSelected("ReactJS");
    });

    expect(result.current.isAnySelected).toBeTruthy();
    expect(result.current.selectionMap).toEqual(expectedSelectionMap);
    expect(router.useNavigate).toHaveBeenCalled();
  });

  it("should clear the selection through onClearSelection", () => {
    mockUseQueryParamKeywords.mockReturnValueOnce(["Machine Learning", "TensorFlow"]);

    const media1 = createMedia({ title: "Media 1", keywordKeys: ["TypeScript", "ReactJS"] });
    const media2 = createMedia({ title: "Media 2", keywordKeys: ["TypeScript", "ReactJS", "Machine Learning"] });
    const media3 = createMedia({ title: "Media 3", keywordKeys: ["Quarkus", "TensorFlow"] });
    const expectedSelectionMap = new Map([
      ["TypeScript", false],
      ["ReactJS", false],
      ["Machine Learning", false],
      ["Quarkus", false],
      ["TensorFlow", false],
    ]);

    const { result } = renderHook(() => useKeywordSelection([media1, media2], [media3]));
    expect(result.current.isAnySelected).toBeTruthy();

    act(() => {
      result.current.onClearSelection();
    });

    expect(result.current.isAnySelected).toBeFalsy();
    expect(result.current.selectionMap).toEqual(expectedSelectionMap);
  });
});
