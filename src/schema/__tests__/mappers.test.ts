import { TFunction } from "i18next";
import { buildCode, buildJourney, buildLocations, buildTalk, buildText } from "../mappers";

const t = ((key: string) => key) as unknown as TFunction;

describe("schema mappers", () => {
  it("should map locations and resolve journey entries", () => {
    const locations = buildLocations(t);
    const journey = buildJourney(t, locations);

    expect(journey.award[0].location.name).toBe("literal:unifei");
    expect(journey.experience[0].title).toBe(
      "literal:softwareEngineer → literal:seniorSoftwareEngineer → literal:principalSoftwareEngineer",
    );
    expect(journey.experience[0].period.end).toBe("literal:present");
  });

  it("should map media dates and preserve slide route override", () => {
    const slideUrl = "/static/slides/demo.pdf";
    const talk = buildTalk(t, slideUrl);
    const text = buildText(t);
    const code = buildCode(t);

    expect(talk.conferences[0].url).toBe(slideUrl);
    expect(text.blogPosts[0].releaseDate).toBeInstanceOf(Date);
    expect(code.repositories.length).toBeGreaterThan(0);
  });
});
