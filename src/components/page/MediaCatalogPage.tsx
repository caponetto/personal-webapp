import { ReactNode, useMemo } from "react";
import { filterAndSortMedias } from "../../hooks/useFilteredMedias";
import { useKeywordSelection } from "../../hooks/useKeywordSelection";
import { PageNames } from "../../routes";
import { MediaItem } from "../../schema";
import { KeywordChips } from "../chip";
import { MediaSection } from "./MediaSection";
import { Page } from "./Page";

type MediaCatalogSection = Readonly<{
  title: string;
  mediaItems: MediaItem[];
}>;

type MediaCatalogPageProps = Readonly<{
  pageName: PageNames;
  headerContent: ReactNode;
  headerSubtitle?: ReactNode;
  sections: MediaCatalogSection[];
}>;

export function MediaCatalogPage(props: MediaCatalogPageProps) {
  const keywordSelection = useKeywordSelection(...props.sections.map((section) => section.mediaItems));

  const filteredSections = useMemo(
    () =>
      props.sections.map((section) => ({
        ...section,
        mediaItems: filterAndSortMedias(
          section.mediaItems,
          keywordSelection.selectionMap,
          keywordSelection.isAnySelected,
        ),
      })),
    [keywordSelection.isAnySelected, keywordSelection.selectionMap, props.sections],
  );

  const totalCount = useMemo(
    () => props.sections.reduce((accumulator, section) => accumulator + section.mediaItems.length, 0),
    [props.sections],
  );

  const resultCount = useMemo(
    () => filteredSections.reduce((accumulator, section) => accumulator + section.mediaItems.length, 0),
    [filteredSections],
  );

  return (
    <Page name={props.pageName} headerContent={props.headerContent} headerSubtitle={props.headerSubtitle}>
      <KeywordChips keywordSelection={keywordSelection} resultCount={resultCount} totalCount={totalCount} />
      {filteredSections.map((section) => (
        <MediaSection
          key={`media-section-${props.pageName}-${section.title}`}
          title={section.title}
          keywordSelection={keywordSelection}
          mediaItems={section.mediaItems}
        />
      ))}
    </Page>
  );
}
