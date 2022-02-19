import { render } from "@testing-library/react";
import * as React from "react";
import { TwitterButton } from "../../../../src/components/button";

describe("TwitterButton", () => {
  it("should match the snapshot", async () => {
    const { getByTestId } = render(<TwitterButton onClick={jest.fn()} />);
    expect(getByTestId("Twitter-button")).toMatchSnapshot();
  });
});
