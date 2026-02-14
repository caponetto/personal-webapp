import { AppShellPage } from "../pages/AppShellPage";

describe("Settings persistence", () => {
  const appShell = new AppShellPage();

  it("persists theme preference in localStorage after reload", () => {
    appShell.visit("about");
    appShell.openSettings();
    appShell.chooseTheme("dark");
    appShell.closeSettings();
    cy.reload();
    cy.window().then((window) => {
      const colorModeRaw = window.localStorage.getItem("color_mode");
      expect(JSON.parse(colorModeRaw ?? '""')).to.equal("dark");
    });
  });
});
