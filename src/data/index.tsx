export interface AppData {
  personal: {
    fullName: string;
    location: {
      country: string;
      flag: string;
      url: string;
    };
  };
  about: {
    welcome: string;
    paragraphs: string[];
  };
  journey: {
    education: Journey[];
    certification: Journey[];
    experience: Journey[];
    toolbox: string[];
  };
  text: {
    mastersThesis: Media[];
    blogPosts: Media[];
  };
  talk: {
    lives: Media[];
    conferences: Media[];
  };
  code: {
    repositories: Media[];
  };
}

export type JourneyKind = "education" | "certifications" | "toolbox" | "experience";

export interface Journey {
  title: string;
  period: {
    start: number;
    end?: number | string;
  };
  location: {
    name: string;
    url: string;
  };
}

export interface Media {
  type: "post" | "thesis" | "live" | "conference" | "code";
  title: string;
  releaseDate: Date;
  publishedAt: "KIE Community" | "Towards Data Science" | "UNICAMP" | "The Developer's Conference" | "GitHub";
  keywordKeys: string[];
  url?: string;
}
