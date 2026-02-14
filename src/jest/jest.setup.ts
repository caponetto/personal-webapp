import "@testing-library/jest-dom";
import "jest-axe/extend-expect";
import { TextEncoder as UtilTextEncoder } from "node:util";

// Ensure TextEncoder is available in the JSDOM environment for tests.
// Node's util.TextEncoder has slightly different TS types than DOM's, so cast to any.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).TextEncoder = UtilTextEncoder;
