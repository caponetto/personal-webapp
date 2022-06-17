import { render } from "@testing-library/react";
import { TwitterButton } from "../../../../src/components/button";
import { usingTestingI18nContext } from "../../TestContextWrapper";

describe("TwitterButton", () => {
  it("should match the snapshot", () => {
    const { getByTestId } = render(usingTestingI18nContext(<TwitterButton url="" />).wrapper);
    expect(getByTestId("twitter-button")).toMatchSnapshot();
  });
});
