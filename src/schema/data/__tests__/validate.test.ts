import { assertUniqueIds, assertUniqueIdsInBuckets } from "../validate";

describe("schema data validation", () => {
  it("accepts unique ids in a flat list", () => {
    expect(() => assertUniqueIds([{ id: "item-a" }, { id: "item-b" }], "code")).not.toThrow();
  });

  it("rejects duplicate ids in a flat list", () => {
    expect(() => assertUniqueIds([{ id: "item-a" }, { id: "item-a" }], "code")).toThrow(
      "Duplicate id 'item-a' found in code",
    );
  });

  it("rejects duplicate ids inside bucketed collections", () => {
    expect(() =>
      assertUniqueIdsInBuckets(
        {
          lives: [{ id: "talk-1" }, { id: "talk-1" }],
        },
        "talk",
      ),
    ).toThrow("Duplicate id 'talk-1' found in talk.lives");
  });
});
