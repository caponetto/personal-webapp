declare namespace Cypress {
  interface Chainable {
    percySnapshot(name?: string, options?: unknown): Chainable<unknown>;
  }
}
