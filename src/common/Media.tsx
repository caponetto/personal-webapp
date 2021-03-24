export type MediaType = "post" | "thesis" | "live" | "conference" | "code";

export type Publication =
  | "KIE Community"
  | "Towards Data Science"
  | "UNICAMP"
  | "The Developer's Conference"
  | "GitHub";

export interface Media {
  type: MediaType;
  title: string;
  releaseDate: Date;
  publishedAt: Publication;
  keywords: string[];
  url?: string;
}
