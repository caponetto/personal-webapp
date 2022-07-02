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
  masterThesisSection: 1000,
  blogPostsSection: 1500,
};

export default function TextPage() {
  const app = useApp();
  const active = usePageActive(0);
  const { t } = useTranslation();
  const keywordSelection = useKeywordSelection(app.schema.text.mastersTheses, app.schema.text.blogPosts);
  const filteredMasterThesis = useFilteredMedias(app.schema.text.mastersTheses, keywordSelection);
  const filteredBlogPosts = useFilteredMedias(app.schema.text.blogPosts, keywordSelection);

  return (
    <Page name="text">
      <PageHeader fadeTime={PAGE_FADE_TIME.header}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="text:header">
            Here you can find some of my <strong>texts</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <>
          <KeywordChips fadeTime={PAGE_FADE_TIME.keywordChips} keywordSelection={keywordSelection} />
          {filteredMasterThesis.length > 0 && (
            <MediaSection
              title={t("literal:mastersThesis")}
              fadeTime={PAGE_FADE_TIME.masterThesisSection}
              keywordSelection={keywordSelection}
              mediaItems={filteredMasterThesis}
            />
          )}
          {filteredBlogPosts.length > 0 && (
            <MediaSection
              title={t("literal:blogPosts")}
              fadeTime={PAGE_FADE_TIME.blogPostsSection}
              keywordSelection={keywordSelection}
              mediaItems={filteredBlogPosts}
            />
          )}
        </>
      )}
    </Page>
  );
}
