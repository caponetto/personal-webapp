import { render } from "@testing-library/react";
import * as React from "react";
import { GitHubButton } from "../../../../src/components/button";

describe("GitHubButton", () => {
  it("should match the snapshot", async () => {
    const { getByTestId } = render(<GitHubButton onClick={jest.fn()} />);
    expect(getByTestId("GitHub-button")).toMatchSnapshot();
  });
});
