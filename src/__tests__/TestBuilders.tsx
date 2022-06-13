import { Media, MediaKind, MediaPublishedAt } from "../data";

export const DEFAULT_KEYWORD_SELECTION = {
  selectionMap: new Map(),
  onToggleSelection: jest.fn(),
  onClearSelection: jest.fn(),
  isAnySelected: false,
};

export const createMedia = (args: {
  title: string;
  keywordKeys?: string[];
  kind?: MediaKind;
  releasedDate?: Date;
  publishedAt?: MediaPublishedAt;
}): Media => ({
  title: args.title,
  keywordKeys: args.keywordKeys ?? [],
  kind: args.kind ?? "post",
  releaseDate: args.releasedDate ?? new Date(),
  publishedAt: args.publishedAt ?? "GitHub",
});
