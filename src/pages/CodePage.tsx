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
  repositoriesSection: 1000,
};

export default function CodePage() {
  const app = useApp();
  const active = usePageActive(0);
  const { t } = useTranslation();
  const keywordSelection = useKeywordSelection(app.schema.code.repositories);
  const filteredRepositories = useFilteredMedias(app.schema.code.repositories, keywordSelection);

  return (
    <Page name="code">
      <PageHeader fadeTime={PAGE_FADE_TIME.header}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="code:header">
            Here you can find some of my <strong>code</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <>
          <KeywordChips fadeTime={PAGE_FADE_TIME.keywordChips} keywordSelection={keywordSelection} />
          {filteredRepositories.length > 0 && (
            <MediaSection
              title={t("literal:repositories")}
              fadeTime={PAGE_FADE_TIME.repositoriesSection}
              keywordSelection={keywordSelection}
              mediaItems={filteredRepositories}
            />
          )}
        </>
      )}
    </Page>
  );
}
