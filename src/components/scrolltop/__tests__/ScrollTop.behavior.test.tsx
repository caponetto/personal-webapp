import { fireEvent, render, screen } from "@testing-library/react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { usingTestingI18nContext } from "../../../jest/TestContextWrapper";
import { ScrollTop } from "../ScrollTop";

jest.mock("@mui/material/useScrollTrigger");
const mockUseScrollTrigger = useScrollTrigger as jest.MockedFunction<typeof useScrollTrigger>;

describe("ScrollTop", () => {
  beforeEach(() => {
    mockUseScrollTrigger.mockReturnValue(true);
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
