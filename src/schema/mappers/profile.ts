import { TFunction } from "i18next";
import { About, Personal } from "..";
import { tLiteral } from "../../i18n/literal";

export function buildPersonal(t: TFunction): Personal {
  return {
    firstName: t("personal:firstName"),
    lastName: t("personal:lastName"),
    email: "hey@caponetto.dev",
    country: {
      name: tLiteral(t, "brazil"),
      url: "https://www.google.com/maps/place/Brazil",
      emoji: "🇧🇷",
    },
    urls: {
      github: "https://github.com/caponetto",
      linkedin: "https://www.linkedin.com/in/ghcaponetto",
      strava: "https://www.strava.com/athletes/34965373",
      x: "https://x.com/caponetto",
    },
  };
}

export function buildAbout(t: TFunction): About {
  const paragraphsResult = t("about:paragraphs", { returnObjects: true });
  let paragraphs: string[] = [];

  if (Array.isArray(paragraphsResult)) {
    paragraphs = paragraphsResult.filter((value): value is string => typeof value === "string");
  } else if (typeof paragraphsResult === "string") {
    paragraphs = [paragraphsResult];
  }

  return {
    welcome: t("about:welcome"),
    paragraphs,
  };
}
