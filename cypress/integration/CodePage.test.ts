describe("CodePage", () => {
  beforeEach(() => {
    cy.viewport(1000, 800);
  });

  it("should navigate to /code when clicking in the Code list item", () => {
    cy.visit("/");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="code-item-button"]').click();
    });
    cy.url().should("include", "/code");
  });

  it("should navigate to /code when clicking in the Code list item (small screen)", () => {
    cy.viewport(400, 600);
    cy.visit("/about");
    cy.get('[data-testid="open-drawer-button"]').click();
    cy.get('[data-testid="temporary-drawer"]').within(() => {
      cy.get('[data-testid="code-item-button"]').click();
      cy.url().should("include", "/code");
    });
  });

  it("should select the Code item when clicking on its item", () => {
    cy.visit("/about");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="code-item-button"]').should("not.have.class", "Mui-selected");
      cy.get('[data-testid="code-item-button"]').click();
      cy.get('[data-testid="code-item-button"]').should("have.class", "Mui-selected");
      cy.get('[data-testid="about-item-button"]').should("not.have.class", "Mui-selected");
    });
  });
});
