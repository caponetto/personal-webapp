import { render, screen } from "@testing-library/react";
import { usePageActive } from "../../../hooks/usePageActive";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import TalkPage from "../TalkPage";

jest.mock("../../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("TalkPage", () => {
  it("renders page structure and key sections", () => {
    mockUsePageActive.mockReturnValue(true);
    render(usingTestingContext(<TalkPage />));

    expect(screen.getByTestId("talk-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "header" })).toBeInTheDocument();
    expect(screen.getByText("headerSubtitle")).toBeInTheDocument();
    expect(screen.getByText(/lives \(\d+\)/i)).toBeInTheDocument();
    expect(screen.getByText(/conferences \(\d+\)/i)).toBeInTheDocument();
    expect(screen.getByText("filters.results")).toBeInTheDocument();
  });
});
