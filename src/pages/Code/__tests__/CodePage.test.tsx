import { render, screen } from "@testing-library/react";
import { usePageActive } from "../../../hooks/usePageActive";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import CodePage from "../CodePage";

jest.mock("../../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("CodePage", () => {
  it("renders page structure and key sections", () => {
    mockUsePageActive.mockReturnValue(true);
    render(usingTestingContext(<CodePage />));

    expect(screen.getByTestId("code-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "header" })).toBeInTheDocument();
    expect(screen.getByText("headerSubtitle")).toBeInTheDocument();
    expect(screen.getByText(/repositories \(\d+\)/i)).toBeInTheDocument();
    expect(screen.getByText("filters.results")).toBeInTheDocument();
  });
});
