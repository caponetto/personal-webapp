const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  video: true,
  videosFolder: "../dist-test/videos",
  screenshotsFolder: "../dist-test/screenshots",
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "https://localhost:9001/#",
    supportFile: "support/index.ts",
    specPattern: "integration",
  },
});
