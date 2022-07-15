import { render } from "@testing-library/react";
import { usingTestingI18nContext } from "../../../jest/TestContextWrapper";
import { LinkedInButton } from "../LinkedInButton";

describe("LinkedInButton", () => {
  it("should match the snapshot", () => {
    const { getByTestId } = render(usingTestingI18nContext(<LinkedInButton url="" />).wrapper);
    expect(getByTestId("linkedin-button")).toMatchSnapshot();
  });
});
