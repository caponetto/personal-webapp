import about from "../../static/locales/en/about.json";
import code from "../../static/locales/en/code.json";
import common from "../../static/locales/en/common.json";
import drawer from "../../static/locales/en/drawer.json";
import journey from "../../static/locales/en/journey.json";
import literal from "../../static/locales/en/literal.json";
import personal from "../../static/locales/en/personal.json";
import talk from "../../static/locales/en/talk.json";
import text from "../../static/locales/en/text.json";
import localeObjectUtils from "./localeObjectUtils.cjs";

export const resources = {
  about,
  code,
  common,
  drawer,
  journey,
  literal,
  personal,
  talk,
  text,
} as const;

export type Resources = typeof resources;
export type Namespace = keyof Resources;

type LeafPaths<T> = T extends readonly unknown[]
  ? never
  : {
      [K in keyof T & string]: T[K] extends readonly unknown[]
        ? K
        : T[K] extends object
          ? `${K}.${LeafPaths<T[K]>}`
          : K;
    }[keyof T & string];

type NamespaceKey<N extends Namespace> = LeafPaths<Resources[N]>;

export type TranslationKey = {
  [N in Namespace]: `${N}:${NamespaceKey<N>}`;
}[Namespace];

const translationKeySet: Set<string> = new Set(
  (Object.keys(resources) as Namespace[]).flatMap((namespace) =>
    localeObjectUtils.collectLeafPaths(resources[namespace] as unknown).map((path) => `${namespace}:${path}`),
  ),
);

export const isTranslationKey = (value: unknown): value is TranslationKey =>
  typeof value === "string" && translationKeySet.has(value);
