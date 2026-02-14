import { z } from "zod";
import { CODE_DATA } from "./code";
import { JOURNEY_DATA, JOURNEY_TOOLBOX_KEYS } from "./journey";
import { LOCATION_DATA } from "./locations";
import { TALK_DATA } from "./talk";
import { TEXT_DATA } from "./text";
import { codeDataSchema, journeyDataSchema, locationsDataSchema, talkDataSchema, textDataSchema } from "../zod";

let validated = false;

export function assertUniqueIds(entries: Array<{ id: string }>, collectionName: string) {
  const seen = new Set<string>();
  entries.forEach((entry) => {
    if (seen.has(entry.id)) {
      throw new Error(`Duplicate id '${entry.id}' found in ${collectionName}`);
    }
    seen.add(entry.id);
  });
}

export function assertUniqueIdsInBuckets(buckets: Record<string, Array<{ id: string }>>, parentCollectionName: string) {
  Object.entries(buckets).forEach(([bucketName, entries]) => {
    assertUniqueIds(entries, `${parentCollectionName}.${bucketName}`);
  });
}

export function validateSchemaData() {
  if (validated) {
    return;
  }

  locationsDataSchema.parse(LOCATION_DATA);
  journeyDataSchema.parse(JOURNEY_DATA);
  z.array(z.string()).parse(JOURNEY_TOOLBOX_KEYS);
  textDataSchema.parse(TEXT_DATA);
  talkDataSchema.parse(TALK_DATA);
  codeDataSchema.parse(CODE_DATA);
  assertUniqueIdsInBuckets(JOURNEY_DATA, "journey");
  assertUniqueIdsInBuckets(TEXT_DATA, "text");
  assertUniqueIdsInBuckets(TALK_DATA, "talk");
  assertUniqueIds(CODE_DATA, "code");

  validated = true;
}
