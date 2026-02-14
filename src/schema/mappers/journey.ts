import { TFunction } from "i18next";
import { Journey, JourneyItem, Place } from "..";
import { literalKey } from "../../i18n/literal";
import { JOURNEY_DATA, JOURNEY_TOOLBOX_KEYS, LocationKey } from "../data";

const mapJourneyTitle = (t: TFunction, titleKey: string | string[]) =>
  Array.isArray(titleKey) ? titleKey.map((key) => t(key)).join(" → ") : t(titleKey);

const mapJourneyEntries = (
  t: TFunction,
  entries: typeof JOURNEY_DATA.award,
  locations: Record<LocationKey, Pick<Place, "name" | "url">>,
): JourneyItem[] =>
  entries.map((entry) => ({
    id: entry.id,
    kind: entry.kind,
    title: mapJourneyTitle(t, entry.titleKey),
    period: {
      start: entry.period.start,
      end: entry.period.end === "literal:present" ? t(entry.period.end) : entry.period.end,
    },
    location: locations[entry.locationKey],
  }));

export function buildJourney(t: TFunction, locations: Record<LocationKey, Pick<Place, "name" | "url">>): Journey {
  return {
    award: mapJourneyEntries(t, JOURNEY_DATA.award, locations),
    education: mapJourneyEntries(t, JOURNEY_DATA.education, locations),
    certification: mapJourneyEntries(t, JOURNEY_DATA.certification, locations),
    experience: mapJourneyEntries(t, JOURNEY_DATA.experience, locations),
    toolbox: JOURNEY_TOOLBOX_KEYS.map((key) => t(literalKey(key))),
  };
}
