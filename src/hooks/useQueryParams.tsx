import { useLocation } from "react-router";

export enum QueryParams {
  KEYWORDS = "k",
}

export function useQueryParams(name: string): string | undefined {
  const location = useLocation();

  const urlSearchParams = new URLSearchParams(location.search);
  if (!urlSearchParams.has(name)) {
    return;
  }

  const value = urlSearchParams.get(name);
  if (!value) {
    return;
  }

  return decodeURIComponent(value);
}

export function useQueryParamKeywords(): string[] {
  return useQueryParams(QueryParams.KEYWORDS)?.split(",") ?? [];
}

export function prepareKeywordsQueryParams(keywords: string[]): string {
  return `${QueryParams.KEYWORDS}=${encodeURIComponent(keywords.join(","))}`;
}
