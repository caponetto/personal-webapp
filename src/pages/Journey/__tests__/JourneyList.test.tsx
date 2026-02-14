import { render } from "@testing-library/react";
import { JourneyItem } from "../../../schema";
import { JourneyList } from "../JourneyList";

const BASE_ITEM: JourneyItem = {
  id: "journey-item-1",
  kind: "experience",
  title: "Initial title",
  period: { start: 2020, end: 2021 },
  location: { name: "Somewhere", url: "https://example.com" },
};

describe("JourneyList", () => {
  it("keeps list item node stable when title changes but id is the same", () => {
    const { getByRole, rerender } = render(<JourneyList kind="experience" items={[BASE_ITEM]} />);
    const beforeNode = getByRole("listitem");

    rerender(<JourneyList kind="experience" items={[{ ...BASE_ITEM, title: "Updated title" }]} />);
    const afterNode = getByRole("listitem");

    expect(afterNode).toBe(beforeNode);
  });
});
