import { render } from "@testing-library/react";
import { GitHubButton } from "../../../../src/components/button";
import { usingTestingI18nContext } from "../../TestContextWrapper";

describe("GitHubButton", () => {
  it("should match the snapshot", () => {
    const { getByTestId } = render(usingTestingI18nContext(<GitHubButton url="" />).wrapper);
    expect(getByTestId("github-button")).toMatchSnapshot();
  });
});
