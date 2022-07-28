describe("TalkPage", () => {
  beforeEach(() => {
    cy.setScreen("large");
  });

  it("should navigate to /talk when clicking in the Talk list item", () => {
    cy.visit("/");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("talk").click();
    });
    cy.assertLocation("/talk");
    cy.title().should("contain", "| Talk");
  });

  it("should navigate to /talk when clicking in the Talk list item (small screen)", () => {
    cy.setScreen("small");
    cy.visit("/about");
    cy.openDrawer();
    cy.getDrawer("temporary").within(() => {
      cy.getDrawerItem("talk").click();
      cy.assertLocation("/talk");
    });
  });

  it("should select the Talk item when clicking on its item", () => {
    cy.visit("/about");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("talk").should("not.have.class", "Mui-selected");
      cy.getDrawerItem("talk").click();
      cy.getDrawerItem("talk").should("have.class", "Mui-selected");
      cy.getDrawerItem("about").should("not.have.class", "Mui-selected");
    });
  });
});
