import { AppShellPage } from "../pages/AppShellPage";

describe("Mobile drawer navigation", () => {
  const appShell = new AppShellPage();

  it("opens temporary drawer and navigates to another section", () => {
    cy.viewport("iphone-8");
    appShell.visit("about");

    appShell.openMobileDrawer();
    cy.getByTestId("nav-item-journey").filter(":visible").should("exist");

    appShell.goTo("journey");
    cy.location("hash").should("eq", "#/journey");
    cy.getByTestId("journey-page").should("be.visible");
    cy.getByTestId("open-drawer-button").should("be.visible");
  });
});
