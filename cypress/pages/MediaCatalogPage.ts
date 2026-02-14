export class MediaCatalogPage {
  visitTextPage() {
    cy.visit("/#/text", {
      onBeforeLoad: (window) => {
        window.localStorage.clear();
      },
    });
  }

  toggleKeyword(keywordKey: string) {
    cy.getByTestId(`keyword-chip-${keywordKey}`).click();
  }

  clearFilters() {
    cy.getByTestId("clear-filters-button").click();
  }

  mediaCards() {
    return cy.getByTestId("media-card");
  }
}
