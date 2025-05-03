import { render } from "@testing-library/react";
import { usePageActive } from "../../../hooks/usePageActive";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import CodePage from "../CodePage";

jest.mock("../../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("CodePage", () => {
  it("should match the snapshot", () => {
    const pageName = "code";
    mockUsePageActive.mockReturnValue(true);
    const { getByTestId } = render(usingTestingContext(<CodePage />));
    expect(getByTestId(`${pageName}-page`)).toMatchSnapshot();
  });
});
