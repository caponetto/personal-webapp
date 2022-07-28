describe("AboutPage", () => {
  beforeEach(() => {
    cy.setScreen("large");
  });

  it("should navigate to /about when accessing /", () => {
    cy.visit("/");
    cy.assertLocation("/about");
  });

  it("should navigate to /about when accessing an unknown page", () => {
    cy.visit("/unknown");
    cy.assertLocation("/about");
  });

  it("should navigate to /about when clicking on the FaceBadge from other page", () => {
    cy.visit("/text");
    cy.getDrawer("permanent").within(() => {
      cy.getById("face-badge").click();
    });
    cy.assertLocation("/about");
  });

  it("should stay in /about when clicking on the FaceBadge from /about", () => {
    cy.visit("/about");
    cy.getDrawer("permanent").within(() => {
      cy.getById("face-badge").click();
    });
    cy.assertLocation("/about");
  });

  it("should navigate to /about when clicking in the About drawer item", () => {
    cy.visit("/text");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("about").click();
    });
    cy.assertLocation("/about");
    cy.title().should("contain", "| About");
  });

  it("should navigate to /about when clicking on the FaceBadge from other page (small screen)", () => {
    cy.setScreen("small");
    cy.visit("/text");
    cy.openDrawer();
    cy.getDrawer("temporary").within(() => {
      cy.getById("face-badge").click();
      cy.assertLocation("/about");
    });
  });

  it("should continue in /about when clicking on the FaceBadge from /about (small screen)", () => {
    cy.setScreen("small");
    cy.visit("/about");
    cy.openDrawer();
    cy.getDrawer("temporary").within(() => {
      cy.getById("face-badge").click();
      cy.assertLocation("/about");
    });
  });

  it("should navigate to /about when clicking in the About list item (small screen)", () => {
    cy.setScreen("small");
    cy.visit("/text");
    cy.openDrawer();
    cy.getDrawer("temporary").within(() => {
      cy.getDrawerItem("about").click();
      cy.assertLocation("/about");
    });
  });

  it("should select the About item when clicking on its item", () => {
    cy.visit("/talk");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("about").should("not.have.class", "Mui-selected");
      cy.getDrawerItem("about").click();
      cy.getDrawerItem("about").should("have.class", "Mui-selected");
      cy.getDrawerItem("talk").should("not.have.class", "Mui-selected");
    });
  });

  it("should select the About item when clicking on the FaceBadge", () => {
    cy.visit("/talk");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("about").should("not.have.class", "Mui-selected");
      cy.getById("face-badge").click();
      cy.getDrawerItem("about").should("have.class", "Mui-selected");
      cy.getDrawerItem("talk").should("not.have.class", "Mui-selected");
    });
  });
});
