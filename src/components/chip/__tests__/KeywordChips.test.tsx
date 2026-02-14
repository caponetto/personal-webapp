import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import i18n from "../../../jest/I18nForTests";
import { KeywordSelection } from "../../../hooks/useKeywordSelection";
import { KeywordChips } from "../KeywordChips";

jest.mock("@mui/material/useMediaQuery", () => jest.fn());
const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

function renderKeywordChips(keywordSelection: KeywordSelection, props?: { resultCount?: number; totalCount?: number }) {
  return render(
    <ThemeProvider theme={createTheme()}>
      <I18nextProvider i18n={i18n}>
        <KeywordChips
          keywordSelection={keywordSelection}
          resultCount={props?.resultCount}
          totalCount={props?.totalCount}
        />
      </I18nextProvider>
    </ThemeProvider>,
  );
}

describe("KeywordChips :: performance", () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(false);
  });

  it("should not recompute literal labels when rerendered with identical selection map", () => {
    const keywordSelection: KeywordSelection = {
      selectionMap: new Map([
        ["github", false],
        ["reactJs", true],
      ]),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: true,
    };

    const getResourceSpy = jest.spyOn(i18n, "getResource");

    const ui = renderKeywordChips(keywordSelection);
    const { rerender } = ui;
    const initialCalls = getResourceSpy.mock.calls.length;

    rerender(
      <ThemeProvider theme={createTheme()}>
        <I18nextProvider i18n={i18n}>
          <KeywordChips keywordSelection={keywordSelection} />
        </I18nextProvider>
      </ThemeProvider>,
    );

    expect(getResourceSpy.mock.calls.length).toBe(initialCalls);
    getResourceSpy.mockRestore();
  });
});

describe("KeywordChips :: behavior", () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(false);
  });

  it("shows clear button when there are selected keywords", () => {
    const withSelection: KeywordSelection = {
      selectionMap: new Map([["reactJs", true]]),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: true,
    };
    renderKeywordChips(withSelection);
    expect(screen.getByLabelText("filters.clearFilters")).toBeInTheDocument();
  });

  it("hides clear button when there are no selected keywords", () => {
    const noSelection: KeywordSelection = {
      selectionMap: new Map([["reactJs", false]]),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: false,
    };
    renderKeywordChips(noSelection);
    expect(screen.queryByLabelText("filters.clearFilters")).not.toBeInTheDocument();
  });

  it("calls clear selection when clear button is clicked", () => {
    const onClearSelection = jest.fn();
    const keywordSelection: KeywordSelection = {
      selectionMap: new Map([["reactJs", true]]),
      onToggleSelection: jest.fn(),
      onClearSelection,
      isAnySelected: true,
    };
    renderKeywordChips(keywordSelection);

    fireEvent.click(screen.getByLabelText("filters.clearFilters"));

    expect(onClearSelection).toHaveBeenCalledTimes(1);
  });

  it("hides results badge when result/total counts are not provided", () => {
    const keywordSelection: KeywordSelection = {
      selectionMap: new Map([["reactJs", false]]),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: false,
    };
    renderKeywordChips(keywordSelection);

    expect(screen.queryByText("filters.results")).not.toBeInTheDocument();
  });

  it("toggles show more/less topics on small screens", () => {
    mockUseMediaQuery.mockReturnValue(true);

    const entries = Array.from({ length: 12 }, (_, index) => [`topic${index}`, false] as const);
    const keywordSelection: KeywordSelection = {
      selectionMap: new Map(entries),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: false,
    };

    renderKeywordChips(keywordSelection);

    expect(screen.getByText("filters.showMoreTopics")).toBeInTheDocument();
    expect(screen.queryByTitle("topic8")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("filters.showMoreTopics"));

    expect(screen.getByText("filters.showLessTopics")).toBeInTheDocument();
    expect(screen.getByTitle("topic8")).toBeInTheDocument();
  });
});
