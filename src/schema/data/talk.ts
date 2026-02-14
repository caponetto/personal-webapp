import { TalkData } from "../zod";

export const TALK_DATA: TalkData = {
  lives: [
    {
      id: "talk-live-multiplying-architecture",
      kind: "live",
      titleKey: "talk:lives.multiplyingArchitecture",
      releaseDate: [2023, 5, 29],
      publication: "devNation",
      keywordKeys: ["frontend", "architecture", "editors"],
      url: "https://youtu.be/5XDKKGwtE98",
    },
    {
      id: "talk-live-workspace-collaboration-bc",
      kind: "live",
      titleKey: "talk:lives.workspaceCollaborationInBC",
      releaseDate: [2020, 8, 8],
      publication: "kieCommunity",
      keywordKeys: ["businessCentral", "git", "changeRequests"],
      url: "https://www.youtube.com/watch?v=wWpOKILLlZI",
    },
    {
      id: "talk-live-maven-archetypes-bc",
      kind: "live",
      titleKey: "talk:lives.mavenArchetypesInBC",
      releaseDate: [2020, 8, 15],
      publication: "kieCommunity",
      keywordKeys: ["businessCentral", "maven", "archetypes"],
      url: "https://www.youtube.com/watch?v=E07RXxiZdYc",
    },
    {
      id: "talk-live-stream-decisions-dmn-kafka",
      kind: "live",
      titleKey: "talk:lives.streamDecisionsWithDmnAndKafka",
      releaseDate: [2021, 5, 8],
      publication: "kieCommunity",
      keywordKeys: ["dmn", "openShift", "apacheKafka"],
      url: "https://www.youtube.com/watch?v=pgj4jmkAl5A",
    },
  ],
  conferences: [
    {
      id: "talk-conference-stream-decisions-dmn-kafka",
      kind: "conference",
      titleKey: "talk:conferences.streamDecisionsWithDmnAndKafka",
      releaseDate: [2021, 5, 8],
      publication: "theDevelopersConference",
      keywordKeys: ["dmn", "openShift", "apacheKafka"],
    },
  ],
};
