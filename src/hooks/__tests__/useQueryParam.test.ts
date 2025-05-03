import { renderHook } from "@testing-library/react";
import {
  prepareKeywordsQueryParam,
  QueryParams,
  useQueryParam,
  useQueryParamKeywords,
} from "../../hooks/useQueryParam";
import { mockLocationTo } from "../../jest/TestBuilders";

describe("useQueryParam :: prepareKeywordsQueryParam", () => {
  it("should prepare 'keywords' query params accordingly", () => {
    const queryParam = prepareKeywordsQueryParam(["foo", "bar", "baz"]);
    const expectedKeywords = encodeURIComponent("foo,bar,baz");
    expect(queryParam).toEqual(`${QueryParams.KEYWORDS}=${expectedKeywords}`);
  });
});

describe("useQueryParam :: useQueryParam", () => {
  it("should return undefined when the query param is not found", () => {
    mockLocationTo({});
    const { result } = renderHook(() => useQueryParam("inexistent"));
    expect(result.current).toBeUndefined();
  });

  it("should return the query param accordingly", () => {
    mockLocationTo({ search: "?foo=bar&baz=foo" });
    const { result } = renderHook(() => useQueryParam("foo"));
    expect(result.current).toEqual("bar");
  });
});

describe("useQueryParam :: useQueryParamKeywords", () => {
  it("should return the 'keywords' query param value accordingly", () => {
    const expectedKeywords = encodeURIComponent("foo,bar,baz");
    mockLocationTo({ search: `?${QueryParams.KEYWORDS}=${expectedKeywords}&foo=bar` });
    const { result } = renderHook(() => useQueryParamKeywords());
    expect(result.current).toEqual(["foo", "bar", "baz"]);
  });

  it("should return empty array when 'keywords' query params is not found", () => {
    mockLocationTo({ search: "?foo=bar&baz=foo" });
    const { result } = renderHook(() => useQueryParamKeywords());
    expect(result.current).toEqual([]);
  });
});
