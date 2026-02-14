import { render, screen } from "@testing-library/react";
import { usePageActive } from "../../../hooks/usePageActive";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import TextPage from "../TextPage";

jest.mock("../../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("TextPage", () => {
  it("renders page structure and key sections", () => {
    mockUsePageActive.mockReturnValue(true);
    render(usingTestingContext(<TextPage />));

    expect(screen.getByTestId("text-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "header" })).toBeInTheDocument();
    expect(screen.getByText("headerSubtitle")).toBeInTheDocument();
    expect(screen.getByText(/mastersThesis \(\d+\)/i)).toBeInTheDocument();
    expect(screen.getByText(/patents \(\d+\)/i)).toBeInTheDocument();
    expect(screen.getByText(/blogPosts \(\d+\)/i)).toBeInTheDocument();
    expect(screen.getByText("filters.results")).toBeInTheDocument();
  });
});
