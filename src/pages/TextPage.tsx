import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../components/chip";
import { MediaSection, Page, PageHeader } from "../components/page";
import { useApp } from "../context/AppContext";
import { Media } from "../data";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export default function TextPage() {
  const app = useApp();
  const active = usePageActive();
  const { t } = useTranslation();

  const textKeywords = useMemo(() => {
    const mastersThesisKeywords = app.data.text.mastersThesis.keywordKeys;
    const blogPostKeywords = app.data.text.blogPosts.reduce(
      (acc: string[], blogPost) => acc.concat(blogPost.keywordKeys),
      []
    );
    return [...new Set([...mastersThesisKeywords, ...blogPostKeywords])];
  }, [app.data.text.blogPosts, app.data.text.mastersThesis.keywordKeys]);

  const keywordSelection = useKeywordSelection(textKeywords);
  const [includeMastersThesis, setIncludeMastersThesis] = useState(true);
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<Media[]>([]);

  useEffect(() => {
    setIncludeMastersThesis(
      keywordSelection.selected.length === 0 ||
        app.data.text.mastersThesis.keywordKeys.some((keyword: string) => keywordSelection.selected.includes(keyword))
    );

    setFilteredBlogPosts(
      app.data.text.blogPosts
        .filter(
          (media: Media) =>
            keywordSelection.selected.length === 0 ||
            media.keywordKeys.some((keyword: string) => keywordSelection.selected.includes(keyword))
        )
        .sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())
    );
  }, [app.data.text.blogPosts, app.data.text.mastersThesis.keywordKeys, keywordSelection.selected]);

  return (
    <Page>
      <PageHeader fadeTime={500}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="text:header">
            Here you can find some of my <strong>texts</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <KeywordChips
          keywords={textKeywords}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          onClearSelection={keywordSelection.onClear}
          fadeTime={500}
        />
      )}
      {active && includeMastersThesis && (
        <MediaSection
          title={t("literal:mastersThesis")}
          fadeTime={1000}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={[app.data.text.mastersThesis]}
        />
      )}
      {active && filteredBlogPosts.length > 0 && (
        <MediaSection
          title={t("literal:blogPosts")}
          fadeTime={1500}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredBlogPosts}
        />
      )}
    </Page>
  );
}
