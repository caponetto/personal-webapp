import { TFunction } from "i18next";
import { Place } from "..";
import { LOCATION_DATA, LocationKey } from "../data";

export function buildLocations(t: TFunction): Record<LocationKey, Pick<Place, "name" | "url">> {
  const entries = Object.entries(LOCATION_DATA) as [LocationKey, (typeof LOCATION_DATA)[LocationKey]][];
  return Object.fromEntries(entries.map(([key, value]) => [key, { name: t(value.nameKey), url: value.url }])) as Record<
    LocationKey,
    Pick<Place, "name" | "url">
  >;
}
