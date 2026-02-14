import { MediaCatalogPage } from "../pages/MediaCatalogPage";

describe("Media catalog filters", () => {
  const mediaCatalog = new MediaCatalogPage();

  it("filters writing cards by keyword and restores results when clearing filters", () => {
    mediaCatalog.visitTextPage();
    mediaCatalog.mediaCards().its("length").as("initialCardCount");
    mediaCatalog.toggleKeyword("knative");
    cy.getByTestId("clear-filters-button").should("be.visible");
    mediaCatalog.mediaCards().its("length").as("filteredCardCount");
    cy.get<number>("@initialCardCount").then((initialCardCount) => {
      cy.get<number>("@filteredCardCount").then((filteredCardCount) => {
        expect(filteredCardCount).to.be.greaterThan(0);
        expect(filteredCardCount).to.be.at.most(initialCardCount);
      });
    });
    mediaCatalog.clearFilters();
    cy.getByTestId("clear-filters-button").should("not.exist");
    cy.get<number>("@initialCardCount").then((initialCardCount) => {
      mediaCatalog.mediaCards().its("length").should("eq", initialCardCount);
    });
  });
});
