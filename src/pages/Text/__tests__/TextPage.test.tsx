import { render } from "@testing-library/react";
import { usePageActive } from "../../../hooks/usePageActive";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import TextPage from "../TextPage";

jest.mock("../../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("TextPage", () => {
  it("should match the snapshot", () => {
    const pageName = "text";
    mockUsePageActive.mockReturnValue(true);
    const { getByTestId } = render(usingTestingContext(<TextPage />));
    expect(getByTestId(`${pageName}-page`)).toMatchSnapshot();
  });
});
