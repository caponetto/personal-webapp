import { useTranslation } from "react-i18next";
import { MediaCatalogPage } from "../../components/page";
import { useSchemaContext } from "../../context/AppContext";

export default function TalkPage() {
  const { talk } = useSchemaContext();
  const { t } = useTranslation();

  return (
    <MediaCatalogPage
      pageName="talk"
      headerContent={t("talk:header")}
      headerSubtitle={t("talk:headerSubtitle")}
      sections={[
        { title: t("literal:lives"), mediaItems: talk.lives },
        { title: t("literal:conferences"), mediaItems: talk.conferences },
      ]}
    />
  );
}
