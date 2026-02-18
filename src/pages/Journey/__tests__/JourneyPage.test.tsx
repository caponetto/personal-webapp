import { render } from "@testing-library/react";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import JourneyPage from "../JourneyPage";

describe("JourneyPage", () => {
  it("should match the snapshot", () => {
    const pageName = "journey";
    const { getByTestId } = render(usingTestingContext(<JourneyPage />));
    expect(getByTestId(`${pageName}-page`)).toMatchSnapshot();
  });
});
