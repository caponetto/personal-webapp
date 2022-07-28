describe("TextPage", () => {
  beforeEach(() => {
    cy.setScreen("large");
  });

  it("should navigate to /text when clicking in the Text list item", () => {
    cy.visit("/");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("text").click();
    });
    cy.assertLocation("/text");
    cy.title().should("contain", "| Text");
  });

  it("should navigate to /text when clicking in the Text list item (small screen)", () => {
    cy.setScreen("small");
    cy.visit("/about");
    cy.openDrawer();
    cy.getDrawer("temporary").within(() => {
      cy.getDrawerItem("text").click();
      cy.assertLocation("/text");
    });
  });

  it("should select the Text item when clicking on its item", () => {
    cy.visit("/about");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("text").should("not.have.class", "Mui-selected");
      cy.getDrawerItem("text").click();
      cy.getDrawerItem("text").should("have.class", "Mui-selected");
      cy.getDrawerItem("about").should("not.have.class", "Mui-selected");
    });
  });
});
