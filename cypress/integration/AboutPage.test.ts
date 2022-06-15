describe("AboutPage", () => {
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
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="face-badge"]').click();
    });
    cy.url().should("include", "/about");
  });

  it("should stay in /about when clicking on the FaceBadge from /about", () => {
    cy.visit("/about");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="face-badge"]').click();
    });
    cy.url().should("include", "/about");
  });

  it("should navigate to /about when clicking in the About drawer item", () => {
    cy.visit("/text");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="about-item-button"]').click();
    });
    cy.url().should("include", "/about");
  });

  it("should navigate to /about when clicking on the FaceBadge from other route (small screen)", () => {
    cy.viewport(400, 600);
    cy.visit("/text");
    cy.get('[data-testid="open-drawer-button"]').click();
    cy.get('[data-testid="temporary-drawer"]').within(() => {
      cy.get('[data-testid="face-badge"]').click();
      cy.url().should("include", "/about");
    });
  });

  it("should continue in /about when clicking on the FaceBadge from /about (small screen)", () => {
    cy.viewport(400, 600);
    cy.visit("/about");
    cy.get('[data-testid="open-drawer-button"]').click();
    cy.get('[data-testid="temporary-drawer"]').within(() => {
      cy.get('[data-testid="face-badge"]').click();
      cy.url().should("include", "/about");
    });
  });

  it("should navigate to /about when clicking in the About list item (small screen)", () => {
    cy.viewport(400, 600);
    cy.visit("/text");
    cy.get('[data-testid="open-drawer-button"]').click();
    cy.get('[data-testid="temporary-drawer"]').within(() => {
      cy.get('[data-testid="about-item-button"]').click();
      cy.url().should("include", "/about");
    });
  });

  it("should select the About item when clicking on its item", () => {
    cy.visit("/talk");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="about-item-button"]').should("not.have.class", "Mui-selected");
      cy.get('[data-testid="about-item-button"]').click();
      cy.get('[data-testid="about-item-button"]').should("have.class", "Mui-selected");
      cy.get('[data-testid="talk-item-button"]').should("not.have.class", "Mui-selected");
    });
  });

  it("should select the About item when clicking on the FaceBadge", () => {
    cy.visit("/talk");
    cy.get('[data-testid="permanent-drawer"]').within(() => {
      cy.get('[data-testid="about-item-button"]').should("not.have.class", "Mui-selected");
      cy.get('[data-testid="face-badge"]').click();
      cy.get('[data-testid="about-item-button"]').should("have.class", "Mui-selected");
      cy.get('[data-testid="talk-item-button"]').should("not.have.class", "Mui-selected");
    });
  });
});
