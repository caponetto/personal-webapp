import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { KeywordChips } from "../components/chip";
import { MediaSection, Page, PageHeader } from "../components/page";
import { useApp } from "../context/AppContext";
import { Media } from "../data";
import { useKeywordSelection } from "../hooks/useKeywordSelection";
import { usePageActive } from "../hooks/usePageActive";

export default function CodePage() {
  const app = useApp();
  const active = usePageActive();
  const { t } = useTranslation();

  const codeKeywords = useMemo(() => {
    const repositoryKeywords = app.data.code.repositories.reduce(
      (acc: string[], repo) => acc.concat(repo.keywordKeys),
      []
    );
    return [...new Set(repositoryKeywords)];
  }, [app.data.code.repositories]);

  const keywordSelection = useKeywordSelection(codeKeywords);
  const [filteredRepositories, setFilteredRepositories] = useState<Media[]>([]);

  useEffect(() => {
    setFilteredRepositories(
      app.data.code.repositories
        .filter(
          (media: Media) =>
            keywordSelection.selected.length === 0 ||
            media.keywordKeys.some((keyword: string) => keywordSelection.selected.includes(keyword))
        )
        .sort((a: Media, b: Media) => b.releaseDate.getTime() - a.releaseDate.getTime())
    );
  }, [app.data.code.repositories, keywordSelection.selected]);

  return (
    <Page>
      <PageHeader fadeTime={500}>
        <Typography component="div" sx={{ mb: "30px", fontSize: { sm: "16px", lg: "18px" } }}>
          <Trans i18nKey="code:header">
            Here you can find some of my <strong>code</strong>
          </Trans>
        </Typography>
      </PageHeader>
      {active && (
        <KeywordChips
          keywords={codeKeywords}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          onClearSelection={keywordSelection.onClear}
          fadeTime={500}
        />
      )}
      {active && filteredRepositories.length > 0 && (
        <MediaSection
          title={t("literal:repositories")}
          fadeTime={1000}
          selectedKeywords={keywordSelection.selected}
          onKeywordClicked={keywordSelection.onItemClicked}
          mediaList={filteredRepositories}
        />
      )}
    </Page>
  );
}
