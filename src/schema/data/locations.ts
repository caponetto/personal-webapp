import { LocationData, LocationKey } from "../zod";

export const LOCATION_DATA: Record<LocationKey, LocationData> = {
  unicamp: { nameKey: "literal:unicamp", url: "https://www.unicamp.br" },
  unifei: { nameKey: "literal:unifei", url: "https://unifei.edu.br" },
  udacity: { nameKey: "literal:udacity", url: "https://www.udacity.com" },
  oracle: { nameKey: "literal:oracle", url: "https://www.oracle.com" },
  redHat: { nameKey: "literal:redHat", url: "https://www.redhat.com" },
  samsung: { nameKey: "literal:samsung", url: "https://www.samsung.com" },
  iFood: { nameKey: "literal:iFood", url: "https://www.ifood.com.br" },
  motorola: { nameKey: "literal:motorola", url: "https://www.motorola.com" },
  b2ml: { nameKey: "literal:b2mlSystems", url: "https://www.b2ml.com.br" },
};
