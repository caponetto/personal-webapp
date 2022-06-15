describe("TextPage", () => {
  beforeEach(() => {
    cy.viewport(1000, 800);
  });

  it("should navigate to /text when clicking in the Text list item", () => {
    cy.visit("/");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="text-item-button"]').click();
    });
    cy.url().should("include", "/text");
  });

  it("should navigate to /text when clicking in the Text list item (small screen)", () => {
    cy.viewport(400, 600);
    cy.visit("/about");
    cy.get('[data-testid="open-drawer-button"]').click();
    cy.get('[data-testid="temporary-drawer"]').within(() => {
      cy.get('[data-testid="text-item-button"]').click();
      cy.url().should("include", "/text");
    });
  });

  it("should select the Text item when clicking on its item", () => {
    cy.visit("/about");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="text-item-button"]').should("not.have.class", "Mui-selected");
      cy.get('[data-testid="text-item-button"]').click();
      cy.get('[data-testid="text-item-button"]').should("have.class", "Mui-selected");
      cy.get('[data-testid="about-item-button"]').should("not.have.class", "Mui-selected");
    });
  });
});
