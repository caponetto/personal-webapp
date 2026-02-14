import { useTranslation } from "react-i18next";
import { MediaCatalogPage } from "../../components/page";
import { useSchemaContext } from "../../context/AppContext";

export default function TextPage() {
  const { text } = useSchemaContext();
  const { t } = useTranslation();

  return (
    <MediaCatalogPage
      pageName="text"
      headerContent={t("text:header")}
      headerSubtitle={t("text:headerSubtitle")}
      sections={[
        { title: t("literal:mastersThesis"), mediaItems: text.mastersTheses },
        { title: t("literal:patents"), mediaItems: text.patents },
        { title: t("literal:blogPosts"), mediaItems: text.blogPosts },
      ]}
    />
  );
}
