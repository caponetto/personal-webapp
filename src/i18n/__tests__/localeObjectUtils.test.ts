import localeObjectUtils from "../localeObjectUtils.cjs";

const { collectLeafPaths, collectUnsortedObjectPaths, collectValueKinds } = localeObjectUtils;

describe("localeObjectUtils", () => {
  describe("collectLeafPaths", () => {
    it("collects leaf paths for nested objects and arrays", () => {
      const value = {
        a: {
          b: "x",
          c: [{ d: "y" }],
        },
        e: 1,
      };

      expect(collectLeafPaths(value)).toEqual(["a.b", "a.c", "e"]);
    });

    it("returns an empty list for root primitive and root array", () => {
      expect(collectLeafPaths("x")).toEqual([]);
      expect(collectLeafPaths(["x"])).toEqual([]);
    });
  });

  describe("collectUnsortedObjectPaths", () => {
    it("returns unsorted paths for root and nested objects", () => {
      const value = {
        z: 1,
        a: {
          b: 1,
          a: 2,
        },
      };

      expect(collectUnsortedObjectPaths(value)).toEqual(["<root>", "a"]);
    });

    it("returns unsorted paths for objects inside arrays", () => {
      const value = {
        list: [{ b: 1, a: 2 }],
      };

      expect(collectUnsortedObjectPaths(value)).toEqual(["list[0]"]);
    });

    it("returns an empty list for primitive values", () => {
      expect(collectUnsortedObjectPaths("x")).toEqual([]);
      expect(collectUnsortedObjectPaths(null)).toEqual([]);
      expect(collectUnsortedObjectPaths(1)).toEqual([]);
    });
  });

  describe("collectValueKinds", () => {
    it("collects kinds for nested values", () => {
      const value = {
        obj: {
          text: "x",
          num: 1,
        },
        arr: [1, 2],
        nil: null,
        flag: true,
      };

      expect(collectValueKinds(value)).toEqual({
        obj: "object",
        "obj.text": "string",
        "obj.num": "number",
        arr: "array",
        nil: "null",
        flag: "boolean",
      });
    });

    it("returns an empty map for root primitive values", () => {
      expect(collectValueKinds("x")).toEqual({});
      expect(collectValueKinds(1)).toEqual({});
      expect(collectValueKinds(null)).toEqual({});
      expect(collectValueKinds([])).toEqual({});
    });
  });
});
