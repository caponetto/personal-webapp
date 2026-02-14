/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByTestId(value: string): Chainable;
  }
}

Cypress.Commands.add("getByTestId", (value: string) => cy.get(`[data-testid="${value}"]`));
