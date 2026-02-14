import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppSchema } from "../schema";
import { routes } from "../routes";
import {
  buildAbout,
  buildCode,
  buildJourney,
  buildLocations,
  buildPersonal,
  buildTalk,
  buildText,
} from "../schema/mappers";
import { validateSchemaData } from "../schema/data/validate";

if (process.env.NODE_ENV !== "production") {
  validateSchemaData();
}

export function useSchema() {
  const { t } = useTranslation();

  const locations = useMemo(() => buildLocations(t), [t]);
  const personal = useMemo(() => buildPersonal(t), [t]);
  const about = useMemo(() => buildAbout(t), [t]);
  const journey = useMemo(() => buildJourney(t, locations), [t, locations]);
  const text = useMemo(() => buildText(t), [t]);
  const talk = useMemo(() => buildTalk(t, routes.static.slides.streamingDmnKafka), [t]);
  const code = useMemo(() => buildCode(t), [t]);

  return useMemo<AppSchema>(
    () => ({
      personal,
      about,
      journey,
      text,
      talk,
      code,
    }),
    [about, code, journey, personal, talk, text],
  );
}
