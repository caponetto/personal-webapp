import { render, screen } from "@testing-library/react";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import TextPage from "../TextPage";

describe("TextPage", () => {
  it("renders page structure and key sections", () => {
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
