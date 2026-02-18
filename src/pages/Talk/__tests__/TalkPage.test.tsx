import { render, screen } from "@testing-library/react";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import TalkPage from "../TalkPage";

describe("TalkPage", () => {
  it("renders page structure and key sections", () => {
    render(usingTestingContext(<TalkPage />));

    expect(screen.getByTestId("talk-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "header" })).toBeInTheDocument();
    expect(screen.getByText("headerSubtitle")).toBeInTheDocument();
    expect(screen.getByText(/lives \(\d+\)/i)).toBeInTheDocument();
    expect(screen.getByText(/conferences \(\d+\)/i)).toBeInTheDocument();
    expect(screen.getByText("filters.results")).toBeInTheDocument();
  });
});
