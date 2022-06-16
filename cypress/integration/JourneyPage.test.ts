describe("JourneyPage", () => {
  beforeEach(() => {
    cy.setScreen("large");
  });

  it("should navigate to /journey when clicking in the Journey list item", () => {
    cy.visit("/");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("journey").click();
    });
    cy.assertLocation("/journey");
  });

  it("should navigate to /journey when clicking in the Journey list item (small screen)", () => {
    cy.setScreen("small");
    cy.visit("/text");
    cy.openDrawer();
    cy.getDrawer("temporary").within(() => {
      cy.getDrawerItem("journey").click();
      cy.assertLocation("/journey");
    });
  });

  it("should select the Journey item when clicking on its item", () => {
    cy.visit("/about");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("journey").should("not.have.class", "Mui-selected");
      cy.getDrawerItem("journey").click();
      cy.getDrawerItem("journey").should("have.class", "Mui-selected");
      cy.getDrawerItem("about").should("not.have.class", "Mui-selected");
    });
  });
});
