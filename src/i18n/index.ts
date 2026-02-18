import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

export enum SupportedLanguages {
  English = "en",
  Portuguese = "pt",
  Spanish = "es",
}

const CONTEXT_PATH = process.env["WEBPACK_REPLACE__contextPath"];
const NAMESPACES = ["about", "code", "common", "drawer", "journey", "literal", "personal", "talk", "text"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: SupportedLanguages.English,
    supportedLngs: Object.values(SupportedLanguages),
    ns: NAMESPACES,
    resources: {
      [SupportedLanguages.English]: resources,
    },
    partialBundledLanguages: true,
    detection: {
      order: ["localStorage", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    backend: {
      loadPath: `${CONTEXT_PATH}/static/locales/{{lng}}/{{ns}}.json`,
    },
  });

export default i18n;
