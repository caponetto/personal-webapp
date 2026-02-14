import localeObjectUtils from "../localeObjectUtils.cjs";
import { isTranslationKey, Namespace, resources } from "../resources";

const { collectLeafPaths } = localeObjectUtils;

describe("i18n resources", () => {
  describe("isTranslationKey", () => {
    it("returns true for every leaf key from resources", () => {
      (Object.keys(resources) as Namespace[]).forEach((namespace) => {
        const leafPaths = collectLeafPaths(resources[namespace] as unknown);
        leafPaths.forEach((leafPath) => {
          expect(isTranslationKey(`${namespace}:${leafPath}`)).toBe(true);
        });
      });
    });

    it("returns false for non-string values", () => {
      expect(isTranslationKey(undefined)).toBe(false);
      expect(isTranslationKey(null)).toBe(false);
      expect(isTranslationKey(1)).toBe(false);
      expect(isTranslationKey({ key: "about:welcome" })).toBe(false);
      expect(isTranslationKey(["about:welcome"])).toBe(false);
    });

    it("returns false for unknown namespace or key", () => {
      expect(isTranslationKey("unknown:welcome")).toBe(false);
      expect(isTranslationKey("about:unknown")).toBe(false);
      expect(isTranslationKey("about")).toBe(false);
      expect(isTranslationKey("about.paragraphs")).toBe(false);
    });
  });
});
