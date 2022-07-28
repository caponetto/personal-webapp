import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../../components/chip";
import { MediaSection, Page } from "../../components/page";
import { useApp } from "../../context/AppContext";
import { useFilteredMedias } from "../../hooks/useFilteredMedias";
import { useKeywordSelection } from "../../hooks/useKeywordSelection";

export default function TextPage() {
  const {
    schema: { text },
  } = useApp();
  const { t } = useTranslation();
  const keywordSelection = useKeywordSelection(text.mastersTheses, text.blogPosts);
  const filteredMasterThesis = useFilteredMedias(text.mastersTheses, keywordSelection);
  const filteredBlogPosts = useFilteredMedias(text.blogPosts, keywordSelection);

  return (
    <Page
      name="text"
      headerContent={
        <Trans i18nKey="text:header">
          Here you can find some of my <strong>texts</strong>
        </Trans>
      }
    >
      <KeywordChips keywordSelection={keywordSelection} />
      <MediaSection
        title={t("literal:mastersThesis")}
        keywordSelection={keywordSelection}
        mediaItems={filteredMasterThesis}
      />
      <MediaSection title={t("literal:blogPosts")} keywordSelection={keywordSelection} mediaItems={filteredBlogPosts} />
    </Page>
  );
}
