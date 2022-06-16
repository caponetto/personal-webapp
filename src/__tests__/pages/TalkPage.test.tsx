import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import * as React from "react";
import * as router from "react-router";
import { Router } from "react-router";
import { usePageActive } from "../../hooks/usePageActive";
import TalkPage from "../../pages/TalkPage";
import { mockLocationTo } from "../TestBuilders";
import { usingTestingContext } from "../TestContextWrapper";

jest.spyOn(router, "useNavigate").mockReturnValue(jest.fn());
jest.mock("../../hooks/usePageActive");
const mockUsePageActive = usePageActive as jest.MockedFunction<typeof usePageActive>;

describe("TalkPage", () => {
  it("should match the snapshot", () => {
    const pageName = "talk";
    mockLocationTo({ pathname: `/${pageName}` });
    mockUsePageActive.mockReturnValue(true);
    const history = createMemoryHistory({ initialEntries: [`/${pageName}`] });
    const { getByTestId } = render(
      usingTestingContext(
        <Router location={history.location} navigator={history}>
          <TalkPage />
        </Router>
      )
    );
    expect(getByTestId(`${pageName}-page`)).toMatchSnapshot();
  });
});