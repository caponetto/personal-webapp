import Typography from "@mui/material/Typography";
import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../components/chip";
import { MediaSection, Page, PageHeader } from "../components/page";
import { useApp } from "../context/AppContext";
import { useFilteredMedias } from "../hooks/useFilteredMedias";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export default function TalkPage() {
  const app = useApp();
  const active = usePageActive(0);
  const { t } = useTranslation();
  const keywordSelection = useKeywordSelection(app.data.talk.lives, app.data.talk.conferences);
  const filteredLives = useFilteredMedias(app.data.talk.lives, keywordSelection);
  const filteredConferences = useFilteredMedias(app.data.talk.conferences, keywordSelection);

  return (
    <Page name="talk">
      <PageHeader fadeTime={500}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="talk:header">
            Here you can find some of my <strong>talks</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && <KeywordChips fadeTime={500} keywordSelection={keywordSelection} />}
      {active && filteredLives.length > 0 && (
        <MediaSection
          title={t("literal:lives")}
          fadeTime={1000}
          keywordSelection={keywordSelection}
          mediaList={filteredLives}
        />
      )}
      {active && filteredConferences.length > 0 && (
        <MediaSection
          title={t("literal:conferences")}
          fadeTime={1500}
          keywordSelection={keywordSelection}
          mediaList={filteredConferences}
        />
      )}
    </Page>
  );
}
