describe("JourneyPage", () => {
  beforeEach(() => {
    cy.viewport(1000, 800);
  });

  it("should navigate to /journey when clicking in the Journey list item", () => {
    cy.visit("/");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="journey-item-button"]').click();
    });
    cy.url().should("include", "/journey");
  });

  it("should navigate to /journey when clicking in the Journey list item (small screen)", () => {
    cy.viewport(400, 600);
    cy.visit("/text");
    cy.get('[data-testid="open-drawer-button"]').click();
    cy.get('[data-testid="temporary-drawer"]').within(() => {
      cy.get('[data-testid="journey-item-button"]').click();
      cy.url().should("include", "/journey");
    });
  });

  it("should select the Journey item when clicking on its item", () => {
    cy.visit("/about");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="journey-item-button"]').should("not.have.class", "Mui-selected");
      cy.get('[data-testid="journey-item-button"]').click();
      cy.get('[data-testid="journey-item-button"]').should("have.class", "Mui-selected");
      cy.get('[data-testid="about-item-button"]').should("not.have.class", "Mui-selected");
    });
  });
});
