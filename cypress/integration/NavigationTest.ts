describe("Navigation", () => {
  beforeEach(() => {
    cy.viewport(1000, 800);
  });

  it("should navigate to /about when accessing /", () => {
    cy.visit("/");
    cy.url().should("include", "/about");
  });

  it("should navigate to /about when accessing an unknown route", () => {
    cy.visit("/unknown");
    cy.url().should("include", "/about");
  });

  it("should navigate to /about when clicking on the FaceBadge from other route", () => {
    cy.visit("/text");
    cy.get("#permanent-drawer").within(() => {
      cy.get("#face-badge").click();
    });
    cy.url().should("include", "/about");
  });

  it("should stay in /about when clicking on the FaceBadge from /about", () => {
    cy.visit("/about");
    cy.get("#permanent-drawer").within(() => {
      cy.get("#face-badge").click();
    });
    cy.url().should("include", "/about");
  });

  it("should navigate to /about when clicking in the About list item", () => {
    cy.visit("/text");
    cy.get("#permanent-drawer").within(() => {
      cy.get("#About-item-button").click();
    });
    cy.url().should("include", "/about");
  });

  it("should navigate to /journey when clicking in the Journey list item", () => {
    cy.visit("/");
    cy.get("#permanent-drawer").within(() => {
      cy.get("#Journey-item-button").click();
    });
    cy.url().should("include", "/journey");
  });

  it("should navigate to /text when clicking in the Text list item", () => {
    cy.visit("/");
    cy.get("#permanent-drawer").within(() => {
      cy.get("#Text-item-button").click();
    });
    cy.url().should("include", "/text");
  });

  it("should navigate to /talk when clicking in the Talk list item", () => {
    cy.visit("/");
    cy.get("#permanent-drawer").within(() => {
      cy.get("#Talk-item-button").click();
    });
    cy.url().should("include", "/talk");
  });

  it("should navigate to /code when clicking in the Code list item", () => {
    cy.visit("/");
    cy.get("#permanent-drawer").within(() => {
      cy.get("#Code-item-button").click();
    });
    cy.url().should("include", "/code");
  });
});
