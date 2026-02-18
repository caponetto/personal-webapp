import { render } from "@testing-library/react";
import { usingTestingContext } from "../../../jest/TestContextWrapper";
import AboutPage from "../AboutPage";

describe("AboutPage", () => {
  it("should match the snapshot", () => {
    const pageName = "about";
    const { getByTestId } = render(usingTestingContext(<AboutPage />));
    expect(getByTestId(`${pageName}-page`)).toMatchSnapshot();
  });
});
