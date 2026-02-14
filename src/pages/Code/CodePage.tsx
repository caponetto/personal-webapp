import { useTranslation } from "react-i18next";
import { MediaCatalogPage } from "../../components/page";
import { useSchemaContext } from "../../context/AppContext";

export default function CodePage() {
  const { code } = useSchemaContext();
  const { t } = useTranslation();

  return (
    <MediaCatalogPage
      pageName="code"
      headerContent={t("code:header")}
      headerSubtitle={t("code:headerSubtitle")}
      sections={[{ title: t("literal:repositories"), mediaItems: code.repositories }]}
    />
  );
}
