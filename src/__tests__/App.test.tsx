import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "../App";
import { OpenStateActions } from "../context/OpenState";

const mockOpenStateDispatch = jest.fn();
const mockUseThemeModeContext = jest.fn();
const mockUseUiStateContext = jest.fn();

jest.mock("../i18n", () => ({
  i18n: {},
}));

jest.mock("react-i18next", () => ({
  I18nextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("../context/AppContextProvider", () => ({
  AppContextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("../components/appbar", () => ({
  AppBar: () => <div data-testid="app-shell-appbar" />,
}));

jest.mock("../components/drawer", () => ({
  AppDrawer: () => <div data-testid="app-shell-drawer" />,
}));

jest.mock("../components/scrolltop", () => ({
  ScrollRestoration: () => <div data-testid="app-shell-scroll-restoration" />,
  ScrollTop: ({ canShow }: { canShow: boolean }) => <div data-testid="app-shell-scrolltop">{`${canShow}`}</div>,
}));

jest.mock("../components/snackbar", () => ({
  StorageSnackbar: ({ onClose }: { onClose: () => void }) => (
    <button data-testid="app-shell-snackbar-close" onClick={onClose}>
      close
    </button>
  ),
}));

jest.mock("../pages", () => ({
  RouteSwitch: () => <div data-testid="app-shell-routes" />,
}));

jest.mock("../context/AppContext", () => ({
  useThemeModeContext: () => mockUseThemeModeContext(),
  useUiStateContext: () => mockUseUiStateContext(),
}));

describe("App", () => {
  beforeEach(() => {
    mockOpenStateDispatch.mockReset();
    mockUseThemeModeContext.mockReturnValue({
      colorMode: "light",
      updateColorMode: jest.fn(),
    });
    mockUseUiStateContext.mockReturnValue({
      openState: { drawer: false, settings: false, snackbar: false },
      openStateDispatch: mockOpenStateDispatch,
    });
  });

  it("renders app shell components", () => {
    render(<App />);

    expect(screen.getByTestId("app-shell-scroll-restoration")).toBeInTheDocument();
    expect(screen.getByTestId("app-shell-appbar")).toBeInTheDocument();
    expect(screen.getByTestId("app-shell-drawer")).toBeInTheDocument();
    expect(screen.getByTestId("app-shell-routes")).toBeInTheDocument();
  });

  it("dispatches snackbar close action from storage snackbar", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("app-shell-snackbar-close"));

    expect(mockOpenStateDispatch).toHaveBeenCalledWith({ type: OpenStateActions.SNACKBAR_CLOSE });
  });

  it("hides scroll-to-top while snackbar is open", () => {
    mockUseUiStateContext.mockReturnValue({
      openState: { drawer: false, settings: false, snackbar: true },
      openStateDispatch: mockOpenStateDispatch,
    });

    render(<App />);

    expect(screen.getByTestId("app-shell-scrolltop")).toHaveTextContent("false");
  });
});
