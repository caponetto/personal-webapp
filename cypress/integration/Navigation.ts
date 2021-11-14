describe("Navigation", () => {
  it("should navigate to the About page when accessing the root", () => {
    cy.visit("/");
    cy.url().should("include", "/about");
  });

  it("should navigate to the About page when clicking in the avatar from other page", () => {
    cy.visit("/text");
    cy.get("#face-badge").click();
    cy.url().should("include", "/about");
  });

  it("should continue in the About page when clicking in the avatar from the About page", () => {
    cy.visit("/about");
    cy.get("#face-badge").click();
    cy.url().should("include", "/about");
  });

  it("should navigate to the About page when clicking in the About list item", () => {
    cy.visit("/text");
    cy.get("#About-item-button").click();
    cy.url().should("include", "/about");
  });

  it("should navigate to the Journey page when clicking in the Journey list item", () => {
    cy.visit("/");
    cy.get("#Journey-item-button").click();
    cy.url().should("include", "/journey");
  });

  it("should navigate to the Text page when clicking in the Text list item", () => {
    cy.visit("/");
    cy.get("#Text-item-button").click();
    cy.url().should("include", "/text");
  });

  it("should navigate to the Talk page when clicking in the Talk list item", () => {
    cy.visit("/");
    cy.get("#Talk-item-button").click();
    cy.url().should("include", "/talk");
  });

  it("should navigate to the Code page when clicking in the Code list item", () => {
    cy.visit("/");
    cy.get("#Code-item-button").click();
    cy.url().should("include", "/code");
  });
});
