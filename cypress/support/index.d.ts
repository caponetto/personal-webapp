/// <reference types="cypress" />

declare namespace Cypress {
  type PageKind = "about" | "journey" | "text" | "talk" | "code";
  type DrawerKind = "permanent" | "temporary";
  type DrawerItemKind = PageKind;
  type ScreenKind = "small" | "large";

  interface Chainable {
    getById(value: string): Chainable<JQuery>;
    getDrawer(kind: DrawerKind): Chainable<JQuery>;
    getDrawerItem(kind: DrawerItemKind): Chainable<JQuery>;
    setScreen(kind: ScreenKind): void;
    assertLocation(location: string): void;
    openDrawer(): void;
  }
}
