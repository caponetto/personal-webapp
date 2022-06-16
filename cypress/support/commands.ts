Cypress.Commands.add("getById", (value) => cy.get(`[data-testid="${value}"]`));

Cypress.Commands.add("setScreen", (kind: Cypress.ScreenKind) => {
  cy.viewport(kind === "small" ? 400 : 1200, kind === "small" ? 600 : 1200);
});

Cypress.Commands.add("assertLocation", (location: string) => {
  cy.url().should("include", location);
});

Cypress.Commands.add("getDrawer", (kind: Cypress.DrawerKind) => cy.getById(`${kind}-drawer`));

Cypress.Commands.add("getDrawerItem", (kind: Cypress.DrawerItemKind) => cy.getById(`${kind}-item-button`));

Cypress.Commands.add("openDrawer", () => {
  cy.getById("open-drawer-button").should("be.visible").click();
});
