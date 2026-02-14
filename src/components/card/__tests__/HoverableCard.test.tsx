import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { HoverableCard } from "../HoverableCard";

jest.mock("@mui/material/Card", () => ({
  __esModule: true,
  default: (props: { children: ReactNode; elevation: number }) => (
    <div data-testid="hoverable-card" data-elevation={props.elevation}>
      {props.children}
    </div>
  ),
}));

describe("HoverableCard", () => {
  it("renders with the default elevation", () => {
    render(
      <HoverableCard>
        <span>Content</span>
      </HoverableCard>,
    );

    const card = screen.getByTestId("hoverable-card");
    expect(card).toHaveAttribute("data-elevation", "2");
    expect(card).toHaveTextContent("Content");
  });
});
