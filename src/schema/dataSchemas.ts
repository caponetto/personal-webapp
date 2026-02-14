import { z } from "zod";
import { isTranslationKey } from "../i18n/resources";
import type { TranslationKey } from "../i18n/resources";

const translationKeySchema = z.custom<TranslationKey>(isTranslationKey, {
  message: "Invalid translation key",
});

export const publicationKindSchema = z.enum([
  "kieCommunity",
  "towardsDataScience",
  "unicamp",
  "theDevelopersConference",
  "gitHub",
  "uspto",
  "devNation",
]);

export const mediaKindSchema = z.enum(["post", "thesis", "live", "conference", "code", "patent"]);
export const journeyEntryKindSchema = z.enum(["award", "certification", "education", "experience"]);
export const locationKeySchema = z.enum([
  "unicamp",
  "unifei",
  "udacity",
  "oracle",
  "redHat",
  "samsung",
  "iFood",
  "motorola",
  "b2ml",
]);

export const locationDataSchema = z.object({
  nameKey: translationKeySchema,
  url: z.url(),
});

export const journeyEntryDataSchema = z.object({
  id: z.string().min(1),
  kind: journeyEntryKindSchema,
  titleKey: z.union([translationKeySchema, z.array(translationKeySchema).min(1)]),
  period: z.object({
    start: z.number().int(),
    end: z.union([z.number().int(), z.literal("literal:present")]).optional(),
  }),
  locationKey: locationKeySchema,
});

export const mediaEntryDataSchema = z.object({
  id: z.string().min(1),
  kind: mediaKindSchema,
  titleKey: translationKeySchema,
  releaseDate: z.tuple([z.number().int(), z.number().int(), z.number().int()]),
  publication: publicationKindSchema,
  keywordKeys: z.array(z.string()),
  url: z.url().optional(),
});

export const locationsDataSchema = z.record(locationKeySchema, locationDataSchema);
export const journeyDataSchema = z.object({
  award: z.array(journeyEntryDataSchema),
  education: z.array(journeyEntryDataSchema),
  certification: z.array(journeyEntryDataSchema),
  experience: z.array(journeyEntryDataSchema),
});
export const textDataSchema = z.object({
  mastersTheses: z.array(mediaEntryDataSchema),
  patents: z.array(mediaEntryDataSchema),
  blogPosts: z.array(mediaEntryDataSchema),
});
export const talkDataSchema = z.object({
  lives: z.array(mediaEntryDataSchema),
  conferences: z.array(mediaEntryDataSchema),
});
export const codeDataSchema = z.array(mediaEntryDataSchema);

export type PublicationKind = z.infer<typeof publicationKindSchema>;
export type MediaKind = z.infer<typeof mediaKindSchema>;
export type LocationKey = z.infer<typeof locationKeySchema>;

export type LocationData = z.infer<typeof locationDataSchema>;
export type JourneyEntryData = z.infer<typeof journeyEntryDataSchema>;
export type MediaEntryData = z.infer<typeof mediaEntryDataSchema>;
export type JourneyData = z.infer<typeof journeyDataSchema>;
export type TextData = z.infer<typeof textDataSchema>;
export type TalkData = z.infer<typeof talkDataSchema>;
export type CodeData = z.infer<typeof codeDataSchema>;
