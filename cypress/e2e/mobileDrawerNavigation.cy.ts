import { AppShellPage } from "../pages/AppShellPage";

describe("Mobile drawer navigation", () => {
  const appShell = new AppShellPage();

  it("opens temporary drawer and navigates to another section", () => {
    cy.viewport("iphone-8");
    appShell.visit("about");

    appShell.openMobileDrawer();
    cy.getByTestId("temporary-drawer").should("be.visible");

    appShell.goTo("journey");
    cy.location("hash").should("eq", "#/journey");
    cy.getByTestId("journey-page").should("be.visible");
    cy.getByTestId("temporary-drawer").should("not.be.visible");
  });
});
