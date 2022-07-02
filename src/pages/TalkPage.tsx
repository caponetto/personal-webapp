import Typography from "@mui/material/Typography";
import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../components/chip";
import { MediaSection, Page, PageHeader } from "../components/page";
import { useApp } from "../context/AppContext";
import { useFilteredMedias } from "../hooks/useFilteredMedias";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

const PAGE_FADE_TIME = {
  header: 500,
  keywordChips: 500,
  livesSection: 1000,
  conferencesSection: 1500,
};

export default function TalkPage() {
  const app = useApp();
  const active = usePageActive(0);
  const { t } = useTranslation();
  const keywordSelection = useKeywordSelection(app.schema.talk.lives, app.schema.talk.conferences);
  const filteredLives = useFilteredMedias(app.schema.talk.lives, keywordSelection);
  const filteredConferences = useFilteredMedias(app.schema.talk.conferences, keywordSelection);

  return (
    <Page name="talk">
      <PageHeader fadeTime={PAGE_FADE_TIME.header}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="talk:header">
            Here you can find some of my <strong>talks</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <>
          <KeywordChips fadeTime={PAGE_FADE_TIME.keywordChips} keywordSelection={keywordSelection} />
          {filteredLives.length > 0 && (
            <MediaSection
              title={t("literal:lives")}
              fadeTime={PAGE_FADE_TIME.livesSection}
              keywordSelection={keywordSelection}
              mediaItems={filteredLives}
            />
          )}
          {filteredConferences.length > 0 && (
            <MediaSection
              title={t("literal:conferences")}
              fadeTime={PAGE_FADE_TIME.conferencesSection}
              keywordSelection={keywordSelection}
              mediaItems={filteredConferences}
            />
          )}
        </>
      )}
    </Page>
  );
}
