import { defineConfig } from "cypress";
import defaultConfig from "./cypress.config";

export default defineConfig({
  ...defaultConfig,
  allowCypressEnv: false,
  e2e: {
    ...defaultConfig.e2e,
    specPattern: "cypress/percy/**/*.cy.{ts,tsx}",
    excludeSpecPattern: [],
    supportFile: "cypress/support/e2e.percy.ts",
  },
});
