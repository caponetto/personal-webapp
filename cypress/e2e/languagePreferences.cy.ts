import { AppShellPage } from "../pages/AppShellPage";

describe("Language preferences", () => {
  const appShell = new AppShellPage();

  it("persists language preference after reload", () => {
    appShell.visit("about");
    appShell.openSettings();

    appShell.chooseLanguage("pt");
    cy.getByTestId("language-toggle-pt").should("have.attr", "aria-pressed", "true");

    appShell.closeSettings();
    cy.reload();
    appShell.openSettings();

    cy.getByTestId("language-toggle-pt").should("have.attr", "aria-pressed", "true");
    cy.window().then((window) => {
      const language = window.localStorage.getItem("i18nextLng") ?? "";
      expect(language).to.contain("pt");
    });
  });
});
