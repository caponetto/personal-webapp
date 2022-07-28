import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../../components/chip";
import { MediaSection, Page } from "../../components/page";
import { useApp } from "../../context/AppContext";
import { useFilteredMedias } from "../../hooks/useFilteredMedias";
import { useKeywordSelection } from "../../hooks/useKeywordSelection";

export default function TalkPage() {
  const {
    schema: { talk },
  } = useApp();
  const { t } = useTranslation();
  const keywordSelection = useKeywordSelection(talk.lives, talk.conferences);
  const filteredLives = useFilteredMedias(talk.lives, keywordSelection);
  const filteredConferences = useFilteredMedias(talk.conferences, keywordSelection);

  return (
    <Page
      name="talk"
      headerContent={
        <Trans i18nKey="talk:header">
          Here you can find some of my <strong>talks</strong>
        </Trans>
      }
    >
      <KeywordChips keywordSelection={keywordSelection} />
      <MediaSection title={t("literal:lives")} keywordSelection={keywordSelection} mediaItems={filteredLives} />
      <MediaSection
        title={t("literal:conferences")}
        keywordSelection={keywordSelection}
        mediaItems={filteredConferences}
      />
    </Page>
  );
}
