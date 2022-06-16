describe("CodePage", () => {
  beforeEach(() => {
    cy.setScreen("large");
  });

  it("should navigate to /code when clicking in the Code list item", () => {
    cy.visit("/");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("code").click();
    });
    cy.assertLocation("/code");
  });

  it("should navigate to /code when clicking in the Code list item (small screen)", () => {
    cy.setScreen("small");
    cy.visit("/about");
    cy.openDrawer();
    cy.getDrawer("temporary").within(() => {
      cy.getDrawerItem("code").click();
      cy.assertLocation("/code");
    });
  });

  it("should select the Code item when clicking on its item", () => {
    cy.visit("/about");
    cy.getDrawer("permanent").within(() => {
      cy.getDrawerItem("code").should("not.have.class", "Mui-selected");
      cy.getDrawerItem("code").click();
      cy.getDrawerItem("code").should("have.class", "Mui-selected");
      cy.getDrawerItem("about").should("not.have.class", "Mui-selected");
    });
  });
});
