import { fireEvent, render, screen } from "@testing-library/react";
import { routes } from "../../../routes";
import { DrawerContent } from "../DrawerContent";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: routes.nav.about }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: () => true,
}));

jest.mock("../../../context/AppContext", () => ({
  useSchemaContext: () => ({
    personal: {
      firstName: "Guilherme",
      lastName: "Caponetto",
      country: { name: "Brazil", url: "https://example.com/brazil", emoji: "🇧🇷" },
      urls: { github: "g", linkedin: "l", x: "x" },
    },
  }),
}));

jest.mock("../../badge", () => ({
  FaceBadge: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="face-badge-mock" onClick={onClick}>
      face
    </button>
  ),
}));

jest.mock("../../social", () => ({
  SocialBar: () => <div data-testid="social-bar-mock" />,
}));

jest.mock("../../copyright", () => ({
  Copyright: () => <div data-testid="copyright-mock" />,
}));

describe("DrawerContent", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it("renders all navigation items", () => {
    render(<DrawerContent drawerItemWidth={284} />);

    expect(screen.getByTestId("nav-item-about")).toBeInTheDocument();
    expect(screen.getByTestId("nav-item-journey")).toBeInTheDocument();
    expect(screen.getByTestId("nav-item-text")).toBeInTheDocument();
    expect(screen.getByTestId("nav-item-talk")).toBeInTheDocument();
    expect(screen.getByTestId("nav-item-code")).toBeInTheDocument();
  });

  it("navigates to routes from badge and navigation items", () => {
    render(<DrawerContent drawerItemWidth={284} />);

    fireEvent.click(screen.getByTestId("face-badge-mock"));
    fireEvent.click(screen.getByTestId("nav-item-code"));

    expect(mockNavigate).toHaveBeenNthCalledWith(1, routes.nav.about);
    expect(mockNavigate).toHaveBeenNthCalledWith(2, routes.nav.code);
  });
});
