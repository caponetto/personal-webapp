import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import * as router from "react-router";
import { Router } from "react-router";
import { usePageActive } from "../../../hooks/usePageActive";
import { mockLocationTo } from "../../../jest/TestBuilders";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import TextPage from "../TextPage";

jest.spyOn(router, "useNavigate").mockReturnValue(jest.fn());
jest.mock("../../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("TextPage", () => {
  it("should match the snapshot", () => {
    const pageName = "text";
    mockLocationTo({ pathname: `/${pageName}` });
    mockUsePageActive.mockReturnValue(true);
    const history = createMemoryHistory({ initialEntries: [`/${pageName}`] });
    const { getByTestId } = render(
      usingTestingContext(
        <Router location={history.location} navigator={history}>
          <TextPage />
        </Router>,
      ),
    );
    expect(getByTestId(`${pageName}-page`)).toMatchSnapshot();
  });
});
