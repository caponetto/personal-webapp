import { MediaCatalogPage } from "../pages/MediaCatalogPage";

describe("Media card external link", () => {
  const mediaCatalog = new MediaCatalogPage();

  it("opens media URL in a new tab when card is clicked", () => {
    mediaCatalog.visitTextPage();

    cy.window().then((window) => {
      cy.stub(window, "open").as("windowOpen");
    });

    mediaCatalog.mediaCards().first().click();

    cy.get("@windowOpen").should("have.been.calledOnce");
    cy.get("@windowOpen").its("firstCall.args.1").should("eq", "_blank");
    cy.get("@windowOpen").its("firstCall.args.2").should("eq", "noopener,noreferrer");
  });
});
