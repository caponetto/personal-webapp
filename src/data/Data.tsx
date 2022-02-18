export interface Journey {
  title: string;
  period: {
    start: number;
    end?: number | "Present";
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
  keywords: string[];
  url?: string;
}

export interface PersonalData {
  fullName: string;
  location: {
    country: string;
    flag: string;
    url: string;
  };
}

export interface AboutData {
  paragraphs: string[];
}

export interface JourneyData {
  education: Journey[];
  certification: Journey[];
  experience: Journey[];
  toolbox: string[];
}

export interface TextData {
  keywords: string[];
  masterThesis: Media;
  blogPosts: Media[];
}

export interface TalkData {
  keywords: string[];
  lives: Media[];
  conferences: Media[];
}

export interface CodeData {
  keywords: string[];
  repositories: Media[];
}
