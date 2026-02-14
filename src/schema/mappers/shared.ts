import { TFunction } from "i18next";
import { MediaEntryData } from "../data";

export const dateFromTuple = ([year, monthIndex, day]: [number, number, number]) => new Date(year, monthIndex, day);

export const mapMediaEntry = (t: TFunction, entry: MediaEntryData, urlOverride?: string) => ({
  id: entry.id,
  kind: entry.kind,
  title: t(entry.titleKey),
  releaseDate: dateFromTuple(entry.releaseDate),
  publication: entry.publication,
  keywordKeys: entry.keywordKeys,
  url: urlOverride ?? entry.url,
});
