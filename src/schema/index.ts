export type PublicationKind =
  | "kieCommunity"
  | "towardsDataScience"
  | "unicamp"
  | "theDevelopersConference"
  | "gitHub"
  | "uspto"
  | "devNation";
export type JourneyKind = "award" | "certification" | "education" | "experience" | "toolbox";
export type MediaKind = "post" | "thesis" | "live" | "conference" | "code" | "patent";

export interface Place {
  name: string;
  url?: string;
  emoji?: string;
}

export interface YearPeriod {
  start: number;
  end?: number | string;
}

export interface MediaItem {
  title: string;
  kind: MediaKind;
  releaseDate: Date;
  publication: PublicationKind;
  keywordKeys: string[];
  url?: string;
}

export interface JourneyItem {
  title: string;
  kind: JourneyKind;
  location: Place;
  period: YearPeriod;
}

export interface Personal {
  firstName: string;
  lastName: string;
  country: Required<Place>;
  urls: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface About {
  welcome: string;
  paragraphs: string[];
}

export interface Journey {
  award: JourneyItem[];
  education: JourneyItem[];
  certification: JourneyItem[];
  experience: JourneyItem[];
  toolbox: string[];
}

export interface Text {
  mastersTheses: MediaItem[];
  patents: MediaItem[];
  blogPosts: MediaItem[];
}

export interface Talk {
  lives: MediaItem[];
  conferences: MediaItem[];
}

export interface Code {
  repositories: MediaItem[];
}
