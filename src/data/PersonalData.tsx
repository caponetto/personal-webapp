import { routes } from "../routes";
import { PersonalData } from "./Data";

export const PERSONAL_DATA: PersonalData = {
  fullName: "Guilherme Caponetto",
  location: {
    country: "Brazil",
    flag: "🇧🇷",
    url: routes.urls.mapsCountry,
  },
};
