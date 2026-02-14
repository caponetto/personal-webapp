import { AppShellPage, TopLevelPage } from "../pages/AppShellPage";

describe("Visual regression", () => {
  const appShell = new AppShellPage();
  const pages: TopLevelPage[] = ["about", "journey", "text", "talk", "code"];

  it("captures primary page snapshots", () => {
    pages.forEach((page) => {
      appShell.visit(page);
      cy.getByTestId(`${page}-page`).should("be.visible");
      cy.percySnapshot(`page-${page}-default`);
    });
  });
});
