import { routes } from "../common/Routes";

export interface PersonalData {
  fullName: string;
  location: {
    country: string;
    flag: string;
    url: string;
  };
}

export const PERSONAL_DATA: PersonalData = {
  fullName: "Guilherme Caponetto",
  location: {
    country: "Brazil",
    flag: "🇧🇷",
    url: routes.urls.mapsCountry,
  },
};
