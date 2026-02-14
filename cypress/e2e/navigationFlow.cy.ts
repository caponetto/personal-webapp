import { AppShellPage, TopLevelPage } from "../pages/AppShellPage";

describe("Top-level navigation", () => {
  const appShell = new AppShellPage();
  const allPages: TopLevelPage[] = ["about", "journey", "text", "talk", "code"];

  it("navigates across all sections from the sidebar", () => {
    appShell.visit("about");
    allPages.forEach((page) => {
      appShell.goTo(page);
      cy.location("hash").should("eq", `#/${page}`);
      cy.getByTestId(`${page}-page`).should("be.visible");
    });
  });
});
