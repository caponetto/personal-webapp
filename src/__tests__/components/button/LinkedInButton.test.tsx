import { render } from "@testing-library/react";
import * as React from "react";
import { LinkedInButton } from "../../../../src/components/button";

describe("LinkedInButton", () => {
  it("should match the snapshot", async () => {
    const { getByTestId } = render(<LinkedInButton onClick={jest.fn()} />);
    expect(getByTestId("LinkedIn-button")).toMatchSnapshot();
  });
});
