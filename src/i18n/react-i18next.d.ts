import "react-i18next";
import about from "../../locales/en/about.json";
import code from "../../locales/en/code.json";
import common from "../../locales/en/common.json";
import drawer from "../../locales/en/drawer.json";
import journey from "../../locales/en/journey.json";
import literal from "../../locales/en/literal.json";
import personal from "../../locales/en/personal.json";
import talk from "../../locales/en/talk.json";
import text from "../../locales/en/text.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: {
      about: typeof about;
      code: typeof code;
      common: typeof common;
      drawer: typeof drawer;
      journey: typeof journey;
      literal: typeof literal;
      personal: typeof personal;
      talk: typeof talk;
      text: typeof text;
    };
  }
}
