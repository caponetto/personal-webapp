import { Media } from "../common/Media";
import { routes } from "../common/Routes";

export interface TalkData {
  keywords: string[];
  lives: Media[];
  conferences: Media[];
}

const talkKeywords = {
  apacheKafka: "Apache Kafka",
  archetypes: "Archetypes",
  businessCentral: "Business Central",
  changeRequests: "Change Requests",
  dmn: "DMN",
  git: "Git",
  openshift: "Openshift",
  maven: "Maven",
};

export const TALK_DATA: TalkData = {
  keywords: Object.values(talkKeywords),
  lives: [
    {
      type: "live",
      title: "Workspace collaboration in Business Central",
      releaseDate: new Date("Sept 8, 2020"),
      publishedAt: "KIE Community",
      keywords: [talkKeywords.businessCentral, talkKeywords.git, talkKeywords.changeRequests],
      url: "https://www.youtube.com/watch?v=wWpOKILLlZI",
    },
    {
      type: "live",
      title: "Maven archetype support in Business Central",
      releaseDate: new Date("Sept 15, 2020"),
      publishedAt: "KIE Community",
      keywords: [talkKeywords.businessCentral, talkKeywords.maven, talkKeywords.archetypes],
      url: "https://www.youtube.com/watch?v=wWpOKILLlZI",
    },
    {
      type: "live",
      title: "Streaming decisions with DMN and Kafka",
      releaseDate: new Date("Jun 8, 2021"),
      publishedAt: "KIE Community",
      keywords: [talkKeywords.dmn, talkKeywords.openshift, talkKeywords.apacheKafka],
      url: "https://www.youtube.com/watch?v=pgj4jmkAl5A",
    },
  ],
  conferences: [
    {
      type: "conference",
      title: "Streaming suas decisões com DMN e Kafka (pt-BR)",
      releaseDate: new Date("Jun 8, 2021"),
      publishedAt: "The Developer's Conference",
      keywords: [talkKeywords.dmn, talkKeywords.openshift, talkKeywords.apacheKafka],
      url: routes.slides.streamingDmnKafka,
    },
  ],
};
