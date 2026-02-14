import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { usingTestingI18nContext } from "../../../jest/TestContextWrapper";
import { ScrollTop } from "../ScrollTop";

describe("ScrollTop :: a11y", () => {
  it("should not have basic accessibility violations", async () => {
    const { container } = render(usingTestingI18nContext(<ScrollTop anchor="top" canShow={true} />).wrapper);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
