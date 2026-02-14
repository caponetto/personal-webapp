import { fireEvent, render, screen } from "@testing-library/react";
import { format } from "date-fns";
import { es, ptBR } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useThemeModeContext } from "../../../context/AppContext";
import { KeywordSelection } from "../../../hooks/useKeywordSelection";
import { createMediaItem } from "../../../jest/TestBuilders";
import { MediaCard } from "../MediaCard";

jest.mock("date-fns", () => ({
  format: jest.fn(() => "formatted-date"),
}));

jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: jest.fn(),
}));

jest.mock("../../../context/AppContext", () => ({
  ...jest.requireActual("../../../context/AppContext"),
  useThemeModeContext: jest.fn(),
}));

const mockFormat = format as jest.MockedFunction<typeof format>;
const mockUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>;
const mockUseThemeModeContext = useThemeModeContext as jest.MockedFunction<typeof useThemeModeContext>;

function setupLanguage(language: string) {
  mockUseTranslation.mockReturnValue({
    t: ((key: string) => key) as ReturnType<typeof useTranslation>["t"],
    i18n: { resolvedLanguage: language } as ReturnType<typeof useTranslation>["i18n"],
  } as ReturnType<typeof useTranslation>);
}

describe("MediaCard", () => {
  beforeEach(() => {
    mockFormat.mockClear();
    jest.restoreAllMocks();
    mockUseThemeModeContext.mockReturnValue({
      colorMode: "light",
      updateColorMode: jest.fn(),
    });
  });

  it("uses Portuguese locale when language is pt", () => {
    setupLanguage("pt");

    const keywordSelection: KeywordSelection = {
      selectionMap: new Map(),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: false,
    };

    render(
      <MediaCard
        item={createMediaItem({
          kind: "post",
          publication: "gitHub",
          keywordKeys: ["reactJs"],
          releaseDate: new Date("2020-03-31"),
        })}
        keywordSelection={keywordSelection}
      />,
    );

    expect(mockFormat).toHaveBeenCalledWith(expect.any(Date), "PPP", { locale: ptBR });
  });

  it("uses Spanish locale when language is es", () => {
    setupLanguage("es");

    const keywordSelection: KeywordSelection = {
      selectionMap: new Map(),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: false,
    };

    render(
      <MediaCard
        item={createMediaItem({
          kind: "post",
          publication: "gitHub",
          keywordKeys: ["reactJs"],
          releaseDate: new Date("2020-03-31"),
        })}
        keywordSelection={keywordSelection}
      />,
    );

    expect(mockFormat).toHaveBeenCalledWith(expect.any(Date), "PPP", { locale: es });
  });

  it("toggles keyword when chip is clicked", () => {
    setupLanguage("en");
    const onToggleSelection = jest.fn();
    const keywordSelection: KeywordSelection = {
      selectionMap: new Map([["reactJs", false]]),
      onToggleSelection,
      onClearSelection: jest.fn(),
      isAnySelected: false,
    };

    render(
      <MediaCard
        item={createMediaItem({
          kind: "post",
          publication: "gitHub",
          keywordKeys: ["reactJs"],
          releaseDate: new Date("2020-03-31"),
        })}
        keywordSelection={keywordSelection}
      />,
    );

    fireEvent.click(screen.getByText("literal:reactJs"));
    expect(onToggleSelection).toHaveBeenCalledWith("reactJs");
  });

  it("opens item URL when the card is activated with Enter or Space", () => {
    setupLanguage("en");
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);
    const keywordSelection: KeywordSelection = {
      selectionMap: new Map(),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: false,
    };

    render(
      <MediaCard
        item={createMediaItem({
          title: "Keyboard nav item",
          kind: "post",
          publication: "gitHub",
          keywordKeys: ["reactJs"],
          releaseDate: new Date("2020-03-31"),
          url: "https://example.com/item",
        })}
        keywordSelection={keywordSelection}
      />,
    );

    const cardLink = screen.getByRole("link", { name: "literal:read: Keyboard nav item" });

    fireEvent.keyDown(cardLink, { key: "Enter" });
    fireEvent.keyDown(cardLink, { key: " " });

    expect(openSpy).toHaveBeenNthCalledWith(1, "https://example.com/item", "_blank", "noopener,noreferrer");
    expect(openSpy).toHaveBeenNthCalledWith(2, "https://example.com/item", "_blank", "noopener,noreferrer");
  });

  it("does not bubble chip clicks to card navigation", () => {
    setupLanguage("en");
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);
    const keywordSelection: KeywordSelection = {
      selectionMap: new Map([["reactJs", false]]),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: false,
    };

    render(
      <MediaCard
        item={createMediaItem({
          kind: "post",
          publication: "gitHub",
          keywordKeys: ["reactJs"],
          releaseDate: new Date("2020-03-31"),
          url: "https://example.com/item",
        })}
        keywordSelection={keywordSelection}
      />,
    );

    fireEvent.click(screen.getByText("literal:reactJs"));

    expect(openSpy).not.toHaveBeenCalled();
    expect(keywordSelection.onToggleSelection).toHaveBeenCalledWith("reactJs");
  });

  it("does not render a separate CTA link when card URL exists", () => {
    setupLanguage("en");
    const keywordSelection: KeywordSelection = {
      selectionMap: new Map(),
      onToggleSelection: jest.fn(),
      onClearSelection: jest.fn(),
      isAnySelected: false,
    };

    render(
      <MediaCard
        item={createMediaItem({
          title: "Single action item",
          kind: "post",
          publication: "gitHub",
          keywordKeys: ["reactJs"],
          releaseDate: new Date("2020-03-31"),
          url: "https://example.com/item",
        })}
        keywordSelection={keywordSelection}
      />,
    );

    expect(screen.queryByRole("link", { name: "literal:read" })).not.toBeInTheDocument();
  });
});
