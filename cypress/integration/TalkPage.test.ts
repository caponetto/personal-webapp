describe("TalkPage", () => {
  beforeEach(() => {
    cy.viewport(1000, 800);
  });

  it("should navigate to /talk when clicking in the Talk list item", () => {
    cy.visit("/");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="talk-item-button"]').click();
    });
    cy.url().should("include", "/talk");
  });

  it("should navigate to /talk when clicking in the Talk list item (small screen)", () => {
    cy.viewport(400, 600);
    cy.visit("/about");
    cy.get('[data-testid="open-drawer-button"]').click();
    cy.get('[data-testid="temporary-drawer"]').within(() => {
      cy.get('[data-testid="talk-item-button"]').click();
      cy.url().should("include", "/talk");
    });
  });

  it("should select the Talk item when clicking on its item", () => {
    cy.visit("/about");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="talk-item-button"]').should("not.have.class", "Mui-selected");
      cy.get('[data-testid="talk-item-button"]').click();
      cy.get('[data-testid="talk-item-button"]').should("have.class", "Mui-selected");
      cy.get('[data-testid="about-item-button"]').should("not.have.class", "Mui-selected");
    });
  });
});
