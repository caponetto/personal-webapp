import Typography from "@mui/material/Typography";
import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../components/chip";
import { MediaSection, Page, PageHeader } from "../components/page";
import { useApp } from "../context/AppContext";
import { useFilteredMedias } from "../hooks/useFilteredMedias";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export default function TextPage() {
  const app = useApp();
  const active = usePageActive(0);
  const { t } = useTranslation();
  const keywordSelection = useKeywordSelection(app.schema.text.mastersTheses, app.schema.text.blogPosts);
  const filteredMasterThesis = useFilteredMedias(app.schema.text.mastersTheses, keywordSelection);
  const filteredBlogPosts = useFilteredMedias(app.schema.text.blogPosts, keywordSelection);

  return (
    <Page name="text">
      <PageHeader fadeTime={500}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="text:header">
            Here you can find some of my <strong>texts</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && <KeywordChips fadeTime={500} keywordSelection={keywordSelection} />}
      {active && filteredMasterThesis.length > 0 && (
        <MediaSection
          title={t("literal:mastersThesis")}
          fadeTime={1000}
          keywordSelection={keywordSelection}
          mediaItems={filteredMasterThesis}
        />
      )}
      {active && filteredBlogPosts.length > 0 && (
        <MediaSection
          title={t("literal:blogPosts")}
          fadeTime={1500}
          keywordSelection={keywordSelection}
          mediaItems={filteredBlogPosts}
        />
      )}
    </Page>
  );
}
