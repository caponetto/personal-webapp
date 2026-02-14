import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

const isCi = process.env["CI"] === "true";

export default defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  retries: {
    runMode: isCi ? 2 : 0,
    openMode: 0,
  },
  video: isCi,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    baseUrl: process.env["CYPRESS_BASE_URL"] ?? "https://127.0.0.1:9000",
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    excludeSpecPattern: ["cypress/percy/**/*.cy.{ts,tsx}"],
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",
  },
});
