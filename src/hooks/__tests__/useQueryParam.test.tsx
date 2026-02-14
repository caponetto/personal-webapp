import React from "react";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  prepareKeywordsQueryParam,
  QueryParams,
  useQueryParam,
  useQueryParamKeywords,
} from "../../hooks/useQueryParam";

const getWrapper = (testUrl: string) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[testUrl]}>{children}</MemoryRouter>
  );
  Wrapper.displayName = "TestWrapper";
  return Wrapper;
};

describe("useQueryParam :: prepareKeywordsQueryParam", () => {
  it("should prepare 'keywords' query params accordingly", () => {
    const queryParam = prepareKeywordsQueryParam(["foo", "bar", "baz"]);
    const expectedKeywords = encodeURIComponent("foo,bar,baz");
    expect(queryParam).toEqual(`${QueryParams.KEYWORDS}=${expectedKeywords}`);
  });
});

describe("useQueryParam :: useQueryParam", () => {
  it("should return undefined when the query param is not found", () => {
    const { result } = renderHook(() => useQueryParam("inexistent"), { wrapper: MemoryRouter });
    expect(result.current).toBeUndefined();
  });

  it("should return the query param accordingly", () => {
    const testUrl = "/test?foo=bar&baz=123";
    const { result } = renderHook(() => useQueryParam("foo"), { wrapper: getWrapper(testUrl) });
    expect(result.current).toEqual("bar");
  });

  it("should not throw with malformed escape sequences", () => {
    const testUrl = "/test?k=%";
    const { result } = renderHook(() => useQueryParam(QueryParams.KEYWORDS), { wrapper: getWrapper(testUrl) });
    expect(result.current).toEqual("%");
  });
});

describe("useQueryParam :: useQueryParamKeywords", () => {
  it("should return the 'keywords' query param value accordingly", () => {
    const expectedKeywords = encodeURIComponent("foo,bar,baz");
    const testUrl = `/test?${QueryParams.KEYWORDS}=${expectedKeywords}&foo=bar`;
    const { result } = renderHook(() => useQueryParamKeywords(), { wrapper: getWrapper(testUrl) });
    expect(result.current).toEqual(["foo", "bar", "baz"]);
  });

  it("should return empty array when 'keywords' query params is not found", () => {
    const testUrl = "/test?foo=bar&baz=123";
    const { result } = renderHook(() => useQueryParamKeywords(), { wrapper: getWrapper(testUrl) });
    expect(result.current).toEqual([]);
  });
});
