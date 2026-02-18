import { TFunction } from "i18next";
import { buildAbout, buildPersonal } from "../profile";

describe("profile mappers", () => {
  it("maps personal details and static urls", () => {
    const t = ((key: string) => key) as unknown as TFunction;

    const personal = buildPersonal(t);

    expect(personal.firstName).toBe("personal:firstName");
    expect(personal.lastName).toBe("personal:lastName");
    expect(personal.email).toBe("hey@caponetto.dev");
    expect(personal.country.name).toBe("literal:brazil");
    expect(personal.urls.github).toBe("https://github.com/caponetto");
  });

  it("builds about paragraphs from array and filters non-strings", () => {
    const t = ((key: string, options?: { returnObjects?: boolean }) => {
      if (key === "about:paragraphs" && options?.returnObjects) {
        return ["first", { nested: "x" }, "second"];
      }
      return key;
    }) as unknown as TFunction;

    const about = buildAbout(t);

    expect(about.welcome).toBe("about:welcome");
    expect(about.paragraphs).toEqual(["first", "second"]);
  });

  it("builds about paragraphs from plain string", () => {
    const t = ((key: string, options?: { returnObjects?: boolean }) => {
      if (key === "about:paragraphs" && options?.returnObjects) {
        return "single paragraph";
      }
      return key;
    }) as unknown as TFunction;

    expect(buildAbout(t).paragraphs).toEqual(["single paragraph"]);
  });

  it("returns empty paragraphs when translation result is not string/array", () => {
    const t = ((key: string, options?: { returnObjects?: boolean }) => {
      if (key === "about:paragraphs" && options?.returnObjects) {
        return { paragraph: "value" };
      }
      return key;
    }) as unknown as TFunction;

    expect(buildAbout(t).paragraphs).toEqual([]);
  });
});
