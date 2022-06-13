import { useLocation } from "react-router";

export enum QueryParams {
  KEYWORDS = "k",
}

export function useQueryParam(name: string): string | undefined {
  const location = useLocation();

  const urlSearchParams = new URLSearchParams(location.search);
  const value = urlSearchParams.get(name);
  if (!value) {
    return;
  }

  return decodeURIComponent(value);
}

export function useQueryParamKeywords(): string[] {
  return useQueryParam(QueryParams.KEYWORDS)?.split(",") ?? [];
}

export function prepareKeywordsQueryParam(keywords: string[]): string {
  return `${QueryParams.KEYWORDS}=${encodeURIComponent(keywords.join(","))}`;
}
