import "react-i18next";
import type { Resources } from "./resources";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: Resources;
    strictKeyChecks: true;
  }
}
