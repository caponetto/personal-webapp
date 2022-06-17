import { render } from "@testing-library/react";
import { LinkedInButton } from "../../../../src/components/button";
import { usingTestingI18nContext } from "../../TestContextWrapper";

describe("LinkedInButton", () => {
  it("should match the snapshot", () => {
    const { getByTestId } = render(usingTestingI18nContext(<LinkedInButton url="" />).wrapper);
    expect(getByTestId("linkedin-button")).toMatchSnapshot();
  });
});
