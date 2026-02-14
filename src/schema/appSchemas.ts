import { z } from "zod";
import { mediaKindSchema, publicationKindSchema } from "./dataSchemas";

export const journeyKindSchema = z.enum(["award", "certification", "education", "experience", "toolbox"]);

export const placeSchema = z.object({
  name: z.string(),
  url: z.url().optional(),
  emoji: z.string().optional(),
});

export const yearPeriodSchema = z.object({
  start: z.number().int(),
  end: z.union([z.number().int(), z.string()]).optional(),
});

export const mediaItemSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  kind: mediaKindSchema,
  releaseDate: z.date(),
  publication: publicationKindSchema,
  keywordKeys: z.array(z.string()),
  url: z.string().optional(),
});

export const journeyItemSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  kind: journeyKindSchema,
  location: placeSchema,
  period: yearPeriodSchema,
});

export const personalSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  country: placeSchema.extend({
    url: z.string(),
    emoji: z.string(),
  }),
  urls: z.object({
    github: z.url(),
    linkedin: z.url(),
    x: z.url(),
  }),
});

export const aboutSchema = z.object({
  welcome: z.string(),
  paragraphs: z.array(z.string()),
});

export const journeySchema = z.object({
  award: z.array(journeyItemSchema),
  education: z.array(journeyItemSchema),
  certification: z.array(journeyItemSchema),
  experience: z.array(journeyItemSchema),
  toolbox: z.array(z.string()),
});

export const textSchema = z.object({
  mastersTheses: z.array(mediaItemSchema),
  patents: z.array(mediaItemSchema),
  blogPosts: z.array(mediaItemSchema),
});

export const talkSchema = z.object({
  lives: z.array(mediaItemSchema),
  conferences: z.array(mediaItemSchema),
});

export const codeSchema = z.object({
  repositories: z.array(mediaItemSchema),
});

export const appSchema = z.object({
  personal: personalSchema,
  about: aboutSchema,
  journey: journeySchema,
  text: textSchema,
  talk: talkSchema,
  code: codeSchema,
});

export type JourneyKind = z.infer<typeof journeyKindSchema>;
export type Place = z.infer<typeof placeSchema>;
export type YearPeriod = z.infer<typeof yearPeriodSchema>;
export type MediaItem = z.infer<typeof mediaItemSchema>;
export type JourneyItem = z.infer<typeof journeyItemSchema>;
export type Personal = z.infer<typeof personalSchema>;
export type About = z.infer<typeof aboutSchema>;
export type Journey = z.infer<typeof journeySchema>;
export type Text = z.infer<typeof textSchema>;
export type Talk = z.infer<typeof talkSchema>;
export type Code = z.infer<typeof codeSchema>;
export type AppSchema = z.infer<typeof appSchema>;
