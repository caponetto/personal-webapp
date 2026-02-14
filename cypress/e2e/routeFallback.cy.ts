describe("Route fallback", () => {
  it("redirects unknown routes to About page", () => {
    cy.visit("/#/this-route-does-not-exist", {
      onBeforeLoad: (window) => {
        window.localStorage.clear();
      },
    });

    cy.location("hash").should("eq", "#/about");
    cy.getByTestId("about-page").should("be.visible");
  });
});
