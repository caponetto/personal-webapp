import React from "react";
import { render } from "@testing-library/react";
import { KeywordSelection } from "../../../hooks/useKeywordSelection";
import { MediaItem } from "../../../schema";
import { MediaSection } from "../MediaSection";

jest.mock("../../card", () => {
  const mountCounts = new Map<string, number>();

  const MediaCard = ({ item }: { item: { id: string; title: string } }) => {
    React.useEffect(() => {
      mountCounts.set(item.id, (mountCounts.get(item.id) ?? 0) + 1);
    }, [item.id]);

    return <div data-testid={`media-card-${item.id}`}>{item.title}</div>;
  };

  return { MediaCard, __mountCounts: mountCounts };
});

const MOCK_KEYWORD_SELECTION: KeywordSelection = {
  selectionMap: new Map<string, boolean>(),
  onToggleSelection: jest.fn(),
  onClearSelection: jest.fn(),
  isAnySelected: false,
};

const BASE_ITEM: MediaItem = {
  id: "media-item-1",
  kind: "post",
  title: "Initial media title",
  releaseDate: new Date("2020-01-01"),
  publication: "gitHub",
  keywordKeys: [],
  url: "https://example.com",
};

describe("MediaSection", () => {
  it("does not remount media cards when title changes but id is the same", () => {
    const { __mountCounts } = jest.requireMock("../../card");
    __mountCounts.clear();

    const { rerender } = render(
      <MediaSection title="Section title" mediaItems={[BASE_ITEM]} keywordSelection={MOCK_KEYWORD_SELECTION} />,
    );
    expect(__mountCounts.get(BASE_ITEM.id)).toBe(1);

    rerender(
      <MediaSection
        title="Section title"
        mediaItems={[{ ...BASE_ITEM, title: "Updated media title" }]}
        keywordSelection={MOCK_KEYWORD_SELECTION}
      />,
    );

    expect(__mountCounts.get(BASE_ITEM.id)).toBe(1);
  });
});
