import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../../components/chip";
import { MediaSection, Page } from "../../components/page";
import { useApp } from "../../context/AppContext";
import { useFilteredMedias } from "../../hooks/useFilteredMedias";
import { useKeywordSelection } from "../../hooks/useKeywordSelection";

export default function CodePage() {
  const {
    schema: { code },
  } = useApp();
  const { t } = useTranslation();
  const keywordSelection = useKeywordSelection(code.repositories);
  const filteredRepositories = useFilteredMedias(code.repositories, keywordSelection);

  return (
    <Page
      name="code"
      headerContent={
        <Trans i18nKey="code:header">
          Here you can find some of my <strong>code</strong>
        </Trans>
      }
    >
      <KeywordChips keywordSelection={keywordSelection} />
      <MediaSection
        title={t("literal:repositories")}
        keywordSelection={keywordSelection}
        mediaItems={filteredRepositories}
      />
    </Page>
  );
}
