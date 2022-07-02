import * as router from "react-router";
import { MediaItem } from "../schema";

export const DEFAULT_KEYWORD_SELECTION = {
  selectionMap: new Map(),
  onToggleSelection: jest.fn(),
  onClearSelection: jest.fn(),
  isAnySelected: false,
};

export const createMediaItem = (args: Partial<MediaItem>): MediaItem => ({
  title: args.title ?? "Title",
  keywordKeys: args.keywordKeys ?? [],
  kind: args.kind ?? "post",
  releaseDate: args.releaseDate ?? new Date(),
  publication: args.publication ?? "gitHub",
});

export const mockLocationTo = (args: Partial<router.Location>) => {
  jest.spyOn(router, "useLocation").mockImplementation(() => ({
    pathname: args.pathname ?? "/",
    search: args.search ?? "",
    hash: args.hash ?? "#",
    key: args.key ?? "default",
    state: args.state ?? undefined,
  }));
};
