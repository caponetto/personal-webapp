import { render } from "@testing-library/react";
import { usePageActive } from "../../../hooks/usePageActive";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import AboutPage from "../AboutPage";

jest.mock("../../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("AboutPage", () => {
  it("should match the snapshot", () => {
    const pageName = "about";
    mockUsePageActive.mockReturnValue(true);
    const { getByTestId } = render(usingTestingContext(<AboutPage />));
    expect(getByTestId(`${pageName}-page`)).toMatchSnapshot();
  });
});
