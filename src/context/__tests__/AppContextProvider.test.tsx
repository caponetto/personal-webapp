import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { AppContextProvider } from "../AppContextProvider";

const mockUseLocation = jest.fn();
const mockUseTranslation = jest.fn();
const mockUseSchema = jest.fn();
const mockUseLocalStorage = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => mockUseLocation(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => mockUseTranslation(),
}));

jest.mock("../../hooks/useSchema", () => ({
  useSchema: () => mockUseSchema(),
}));

jest.mock("../../hooks/useLocalStorage", () => ({
  isLocalStorageAvailable: () => true,
  useLocalStorage: (...args: unknown[]) => mockUseLocalStorage(...args),
}));

function Wrapper(props: Readonly<{ children: ReactNode }>) {
  return <AppContextProvider>{props.children}</AppContextProvider>;
}

describe("AppContextProvider", () => {
  const originalMatchMedia = globalThis.matchMedia;

  beforeEach(() => {
    document.title = "initial";
    mockUseLocation.mockReturnValue({ pathname: "/about" });
    mockUseTranslation.mockReturnValue({
      t: (key: string) => key,
    });
    mockUseSchema.mockReturnValue({
      personal: {
        firstName: "Guilherme",
        lastName: "Caponetto",
      },
    });
    mockUseLocalStorage.mockReset();
    mockUseLocalStorage.mockImplementation((key: string, defaultValue: unknown) => {
      if (key === "color_mode") {
        return ["light", jest.fn()];
      }

      return [defaultValue, jest.fn()];
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, "matchMedia", {
      configurable: true,
      writable: true,
      value: originalMatchMedia,
    });
  });

  it("sets page title for recognized route", () => {
    render(<div data-testid="provider-child" />, { wrapper: Wrapper });

    expect(screen.getByTestId("provider-child")).toBeInTheDocument();
    expect(document.title).toBe("literal:about | Guilherme Caponetto");
  });

  it("does not update title for unknown route", () => {
    mockUseLocation.mockReturnValue({ pathname: "/unknown" });

    render(<div />, { wrapper: Wrapper });

    expect(document.title).toBe("initial");
  });

  it("uses system dark mode as color mode fallback when no value is persisted", () => {
    Object.defineProperty(globalThis, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        media: query,
        matches: query === "(prefers-color-scheme: dark)",
      })),
    });

    render(<div />, { wrapper: Wrapper });

    expect(mockUseLocalStorage).toHaveBeenCalledWith("color_mode", "dark");
  });

  it("uses light mode fallback when matchMedia is unavailable", () => {
    Object.defineProperty(globalThis, "matchMedia", {
      configurable: true,
      writable: true,
      value: undefined,
    });

    render(<div />, { wrapper: Wrapper });

    expect(mockUseLocalStorage).toHaveBeenCalledWith("color_mode", "light");
  });
});
