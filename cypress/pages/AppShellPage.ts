export type TopLevelPage = "about" | "journey" | "text" | "talk" | "code";
export type ThemeMode = "light" | "dark";
export type Language = "en" | "pt" | "es";

export class AppShellPage {
  visit(page: TopLevelPage = "about") {
    cy.visit(`/#/${page}`, {
      onBeforeLoad: (window) => {
        window.localStorage.clear();
      },
    });
  }

  goTo(page: TopLevelPage) {
    cy.getByTestId(`nav-item-${page}`).filter(":visible").first().click();
  }

  openMobileDrawer() {
    cy.getByTestId("open-drawer-button").click();
  }

  openSettings() {
    cy.getByTestId("open-settings-button").click();
  }

  closeSettings() {
    cy.getByTestId("close-settings-button").click();
  }

  chooseTheme(mode: ThemeMode) {
    cy.getByTestId(`theme-toggle-${mode}`).click();
  }

  chooseLanguage(language: Language) {
    cy.getByTestId(`language-toggle-${language}`).click();
  }
}
