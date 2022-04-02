import "react-i18next";
import about from "../../static/locales/en/about.json";
import code from "../../static/locales/en/code.json";
import common from "../../static/locales/en/common.json";
import drawer from "../../static/locales/en/drawer.json";
import journey from "../../static/locales/en/journey.json";
import literal from "../../static/locales/en/literal.json";
import personal from "../../static/locales/en/personal.json";
import talk from "../../static/locales/en/talk.json";
import text from "../../static/locales/en/text.json";

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
