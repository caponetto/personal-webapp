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
      <PageHeader>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="text:header">
            Here you can find some of my <strong>texts</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <>
          <KeywordChips keywordSelection={keywordSelection} />
          {filteredMasterThesis.length > 0 && (
            <MediaSection
              title={t("literal:mastersThesis")}
              keywordSelection={keywordSelection}
              mediaItems={filteredMasterThesis}
            />
          )}
          {filteredBlogPosts.length > 0 && (
            <MediaSection
              title={t("literal:blogPosts")}
              keywordSelection={keywordSelection}
              mediaItems={filteredBlogPosts}
            />
          )}
        </>
      )}
    </Page>
  );
}
