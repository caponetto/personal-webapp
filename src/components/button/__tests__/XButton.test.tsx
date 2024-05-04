import { render } from "@testing-library/react";
import { XButton } from "../XButton";
import { usingTestingI18nContext } from "../../../jest/TestContextWrapper";

describe("XButton", () => {
  it("should match the snapshot", () => {
    const { getByTestId } = render(usingTestingI18nContext(<XButton url="" />).wrapper);
    expect(getByTestId("x-button")).toMatchSnapshot();
  });
});
