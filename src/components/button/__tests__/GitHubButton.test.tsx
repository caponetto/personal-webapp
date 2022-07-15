import { render } from "@testing-library/react";
import { usingTestingI18nContext } from "../../../jest/TestContextWrapper";
import { GitHubButton } from "../GitHubButton";

describe("GitHubButton", () => {
  it("should match the snapshot", () => {
    const { getByTestId } = render(usingTestingI18nContext(<GitHubButton url="" />).wrapper);
    expect(getByTestId("github-button")).toMatchSnapshot();
  });
});
