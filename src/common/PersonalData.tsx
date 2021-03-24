import { Journey } from "./Journey";
import { Media } from "./Media";

export interface PersonalData {
  fullName: string;
  location: {
    country: string;
    flag: string;
    url: string;
  };
  about: {
    paragraphs: string[];
    skills: string[];
  };
  journey: {
    education: Journey[];
    certification: Journey[];
    experience: Journey[];
  };
  text: {
    keywords: string[];
    masterThesis: Media;
    blogPosts: Media[];
  };
  talk: {
    keywords: string[];
    lives: Media[];
    conferences: Media[];
  };
  code: {
    keywords: string[];
    repositories: Media[];
  };
}
