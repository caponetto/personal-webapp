import { render } from "@testing-library/react";
import { usePageActive } from "../../../hooks/usePageActive";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import JourneyPage from "../JourneyPage";

jest.mock("../../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("JourneyPage", () => {
  it("should match the snapshot", () => {
    const pageName = "journey";
    mockUsePageActive.mockReturnValue(true);
    const { getByTestId } = render(usingTestingContext(<JourneyPage />));
    expect(getByTestId(`${pageName}-page`)).toMatchSnapshot();
  });
});
