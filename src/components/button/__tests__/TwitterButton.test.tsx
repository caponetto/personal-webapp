import { render } from "@testing-library/react";
import { TwitterButton } from "../TwitterButton";
import { usingTestingI18nContext } from "../../../jest/TestContextWrapper";

describe("TwitterButton", () => {
  it("should match the snapshot", () => {
    const { getByTestId } = render(usingTestingI18nContext(<TwitterButton url="" />).wrapper);
    expect(getByTestId("twitter-button")).toMatchSnapshot();
  });
});
