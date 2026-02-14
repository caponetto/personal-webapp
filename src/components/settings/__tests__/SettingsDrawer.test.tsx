import { fireEvent, render, screen } from "@testing-library/react";
import { SettingsDrawer } from "../SettingsDrawer";

const mockUseThemeModeContext = jest.fn();

jest.mock("../../../i18n", () => ({
  SupportedLanguages: {
    English: "en",
    Portuguese: "pt",
    Spanish: "es",
  },
}));

jest.mock("../../../context/AppContext", () => ({
  useThemeModeContext: () => mockUseThemeModeContext(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      resolvedLanguage: "en",
      changeLanguage: jest.fn(),
    },
  }),
}));

describe("SettingsDrawer", () => {
  beforeEach(() => {
    mockUseThemeModeContext.mockReturnValue({
      colorMode: "light",
      updateColorMode: jest.fn(),
    });
  });

  it("renders settings drawer sections when open", () => {
    render(<SettingsDrawer open={true} onClose={jest.fn()} />);

    expect(screen.getByTestId("settings-drawer")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle-light")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle-dark")).toBeInTheDocument();
    expect(screen.getByTestId("language-toggle-en")).toBeInTheDocument();
    expect(screen.getByTestId("language-toggle-pt")).toBeInTheDocument();
    expect(screen.getByTestId("language-toggle-es")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<SettingsDrawer open={true} onClose={onClose} />);

    fireEvent.click(screen.getByTestId("close-settings-button"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
