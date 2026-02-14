import React from "react";
import { renderHook } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { routes } from "../../routes";
import i18n from "../../jest/I18nForTests";
import { aboutSchema, codeSchema, journeySchema, personalSchema, talkSchema, textSchema } from "../../schema/zod";
import { useSchema } from "../useSchema";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);
Wrapper.displayName = "I18nWrapper";

describe("useSchema :: integration", () => {
  it("should keep the expected output shape and key invariants", () => {
    const { result } = renderHook(() => useSchema(), { wrapper: Wrapper });
    const schema = result.current;

    expect(() => personalSchema.parse(schema.personal)).not.toThrow();
    expect(() => aboutSchema.parse(schema.about)).not.toThrow();
    expect(() => journeySchema.parse(schema.journey)).not.toThrow();
    expect(() => textSchema.parse(schema.text)).not.toThrow();
    expect(() => talkSchema.parse(schema.talk)).not.toThrow();
    expect(() => codeSchema.parse(schema.code)).not.toThrow();

    expect(schema.personal.urls).toEqual({
      github: "https://github.com/caponetto",
      linkedin: "https://www.linkedin.com/in/ghcaponetto",
      x: "https://x.com/caponetto",
    });
    expect(schema.personal.country.emoji).toBe("🇧🇷");

    expect(schema.journey.award).toHaveLength(1);
    expect(schema.journey.education).toHaveLength(2);
    expect(schema.journey.certification).toHaveLength(2);
    expect(schema.journey.experience).toHaveLength(8);
    expect(schema.journey.toolbox).toHaveLength(51);

    expect(schema.text.mastersTheses).toHaveLength(1);
    expect(schema.text.patents).toHaveLength(1);
    expect(schema.text.blogPosts).toHaveLength(14);
    expect(schema.talk.lives).toHaveLength(4);
    expect(schema.talk.conferences).toHaveLength(1);
    expect(schema.code.repositories).toHaveLength(10);

    const conference = schema.talk.conferences[0];
    expect(conference.url).toBe(routes.static.slides.streamingDmnKafka);

    const firstRepo = schema.code.repositories[0];
    expect(firstRepo.publication).toBe("gitHub");
    expect(firstRepo.releaseDate).toBeInstanceOf(Date);
    expect(firstRepo.releaseDate.getFullYear()).toBe(2021);
    expect(firstRepo.releaseDate.getMonth()).toBe(1);
    expect(firstRepo.releaseDate.getDate()).toBe(16);

    const backendPost = schema.text.blogPosts.find((item) => item.url?.includes("backend-support-on-kogito-tooling"));
    expect(backendPost).toBeDefined();
    expect(backendPost?.releaseDate.getFullYear()).toBe(2020);
    expect(backendPost?.releaseDate.getMonth()).toBe(8);
    expect(backendPost?.releaseDate.getDate()).toBe(22);
  });
});
