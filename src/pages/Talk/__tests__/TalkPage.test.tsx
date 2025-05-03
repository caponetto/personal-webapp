import { render } from "@testing-library/react";
import { usePageActive } from "../../../hooks/usePageActive";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import TalkPage from "../TalkPage";

jest.mock("../../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("TalkPage", () => {
  it("should match the snapshot", () => {
    const pageName = "talk";
    mockUsePageActive.mockReturnValue(true);
    const { getByTestId } = render(usingTestingContext(<TalkPage />));
    expect(getByTestId(`${pageName}-page`)).toMatchSnapshot();
  });
});
