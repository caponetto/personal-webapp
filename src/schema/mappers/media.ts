import { TFunction } from "i18next";
import { Code, Talk, Text } from "..";
import { CODE_DATA, TALK_DATA, TEXT_DATA } from "../data";
import { mapMediaEntry } from "./shared";

export function buildText(t: TFunction): Text {
  return {
    mastersTheses: TEXT_DATA.mastersTheses.map((entry) => mapMediaEntry(t, entry)),
    patents: TEXT_DATA.patents.map((entry) => mapMediaEntry(t, entry)),
    blogPosts: TEXT_DATA.blogPosts.map((entry) => mapMediaEntry(t, entry)),
  };
}

export function buildTalk(t: TFunction, streamingDmnKafkaSlideUrl: string): Talk {
  return {
    lives: TALK_DATA.lives.map((entry) => mapMediaEntry(t, entry)),
    conferences: TALK_DATA.conferences.map((entry) =>
      mapMediaEntry(
        t,
        entry,
        entry.titleKey === "talk:conferences.streamDecisionsWithDmnAndKafka" ? streamingDmnKafkaSlideUrl : entry.url,
      ),
    ),
  };
}

export function buildCode(t: TFunction): Code {
  return {
    repositories: CODE_DATA.map((entry) => mapMediaEntry(t, entry)),
  };
}
