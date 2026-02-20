import { fireEvent, render, screen } from "@testing-library/react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { axe } from "jest-axe";
import { usingTestingI18nContext } from "../../../jest/TestContextWrapper";
import { ScrollTop } from "../ScrollTop";

jest.mock("@mui/material/useScrollTrigger");
const mockUseScrollTrigger = useScrollTrigger as jest.MockedFunction<typeof useScrollTrigger>;

describe("ScrollTop :: a11y", () => {
  beforeEach(() => {
    mockUseScrollTrigger.mockReturnValue(true);
  });

  it("should not have basic accessibility violations", async () => {
    const { container } = render(usingTestingI18nContext(<ScrollTop anchor="top" canShow={true} />).wrapper);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("configures the scroll trigger with deterministic options", () => {
    render(usingTestingI18nContext(<ScrollTop anchor="top" canShow={true} />).wrapper);

    expect(mockUseScrollTrigger).toHaveBeenCalledWith({
      disableHysteresis: true,
      threshold: 100,
    });
  });

  it("does not render when canShow is false", () => {
    render(usingTestingI18nContext(<ScrollTop anchor="top" canShow={false} />).wrapper);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("scrolls to anchor when button is clicked", () => {
    const anchor = document.createElement("div");
    anchor.id = "top";
    anchor.scrollIntoView = jest.fn();
    document.body.appendChild(anchor);

    render(usingTestingI18nContext(<ScrollTop anchor="top" canShow={true} />).wrapper);

    fireEvent.click(screen.getByRole("button"));

    expect(anchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });
  });

  it("does nothing when anchor is missing", () => {
    const querySelectorSpy = jest.spyOn(document, "querySelector").mockReturnValue(null);

    render(usingTestingI18nContext(<ScrollTop anchor="missing-anchor" canShow={true} />).wrapper);

    fireEvent.click(screen.getByRole("button"));

    expect(querySelectorSpy).toHaveBeenCalledWith("#missing-anchor");
    querySelectorSpy.mockRestore();
  });
});
