import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppSchema } from "../context/AppSchema";
import { routes } from "../routes";
import { About, Code, Journey, Personal, Place, Talk, Text } from "../schema";

export function useSchema() {
  const { t } = useTranslation();

  const locations = useMemo<{ [key: string]: Pick<Place, "name" | "url"> }>(
    () => ({
      unicamp: {
        name: t("literal:unicamp"),
        url: routes.urls.unicamp,
      },
      unifei: {
        name: t("literal:unifei"),
        url: routes.urls.unifei,
      },
      udacity: {
        name: t("literal:udacity"),
        url: routes.urls.udacity,
      },
      oracle: {
        name: t("literal:oracle"),
        url: routes.urls.oracle,
      },
      redHat: {
        name: t("literal:redHat"),
        url: routes.urls.redHat,
      },
      samsung: {
        name: t("literal:samsung"),
        url: routes.urls.samsung,
      },
      iFood: {
        name: t("literal:iFood"),
        url: routes.urls.iFood,
      },
      motorola: {
        name: t("literal:motorola"),
        url: routes.urls.motorola,
      },
      b2ml: {
        name: t("literal:b2mlSystems"),
        url: routes.urls.b2ml,
      },
    }),
    [t]
  );

  const personal = useMemo<Personal>(
    () => ({
      firstName: t("personal:firstName"),
      lastName: t("personal:lastName"),
      country: {
        name: t("literal:brazil"),
        url: routes.urls.mapsCountry,
        emoji: "🇧🇷",
      },
    }),
    [t]
  );

  const about = useMemo<About>(
    () => ({
      welcome: t("about:welcome"),
      paragraphs: Array.from(t("about:paragraphs", { returnObjects: true })),
    }),
    [t]
  );

  const journey = useMemo<Journey>(
    () => ({
      award: [
        {
          kind: "award",
          title: t("literal:meritHonorDiploma"),
          period: {
            start: 2011,
          },
          location: locations.unifei,
        },
      ],
      education: [
        {
          kind: "education",
          title: t("journey:education.master.title"),
          period: {
            start: 2017,
          },
          location: locations.unicamp,
        },
        {
          kind: "education",
          title: t("journey:education.bachelor.title"),
          period: {
            start: 2011,
          },
          location: locations.unifei,
        },
      ],
      certification: [
        {
          kind: "certification",
          title: t("literal:computerVisionNanoDegree"),
          period: {
            start: 2019,
          },
          location: locations.udacity,
        },
        {
          kind: "certification",
          title: t("literal:oracleCertifiedProfessionalJavaSix"),
          period: {
            start: 2012,
          },
          location: locations.oracle,
        },
      ],
      experience: [
        {
          kind: "experience",
          title: `${t("literal:softwareEngineer")} → ${t("literal:seniorSoftwareEngineer")}`,
          period: {
            start: 2019,
            end: t("literal:present"),
          },
          location: locations.redHat,
        },
        {
          kind: "experience",
          title: `${t("literal:softwareEngineer")} → ${t("literal:seniorSoftwareEngineer")}`,
          period: {
            start: 2017,
            end: 2019,
          },
          location: locations.samsung,
        },
        {
          kind: "experience",
          title: t("literal:softwareEngineer"),
          period: {
            start: 2017,
            end: 2017,
          },
          location: locations.iFood,
        },
        {
          kind: "experience",
          title: t("literal:graduateResearcher"),
          period: {
            start: 2015,
            end: 2017,
          },
          location: locations.unicamp,
        },
        {
          kind: "experience",
          title: t("literal:juniorSoftwareEngineer"),
          period: {
            start: 2012,
            end: 2015,
          },
          location: locations.samsung,
        },
        {
          kind: "experience",
          title: t("literal:softwareDevelopmentIntern"),
          period: {
            start: 2011,
            end: 2011,
          },
          location: locations.motorola,
        },
        {
          kind: "experience",
          title: t("literal:undergraduateResearcher"),
          period: {
            start: 2007,
            end: 2010,
          },
          location: locations.unifei,
        },
        {
          kind: "experience",
          title: t("literal:softwareDevelopmentIntern"),
          period: {
            start: 2007,
            end: 2007,
          },
          location: locations.b2ml,
        },
      ],
      toolbox: [
        t("literal:amazonWebServices"),
        t("literal:android"),
        t("literal:apacheKafka"),
        t("literal:architecture"),
        t("literal:backend"),
        t("literal:csharp"),
        t("literal:cpp"),
        t("literal:css"),
        t("literal:classification"),
        t("literal:clustering"),
        t("literal:computerVision"),
        t("literal:cicd"),
        t("literal:deepLearning"),
        t("literal:designPatterns"),
        t("literal:docker"),
        t("literal:frontend"),
        t("literal:gwt"),
        t("literal:git"),
        t("literal:html"),
        t("literal:jboss"),
        t("literal:jni"),
        t("literal:jpa"),
        t("literal:java"),
        t("literal:javaScript"),
        t("literal:kanban"),
        t("literal:matlab"),
        t("literal:machineLearning"),
        t("literal:multiTaskLearning"),
        t("literal:neuralNetworks"),
        t("literal:noSql"),
        t("literal:nodeJs"),
        t("literal:oop"),
        t("literal:openShift"),
        t("literal:optimization"),
        t("literal:python"),
        t("literal:quarkus"),
        t("literal:restfulWs"),
        t("literal:reactJs"),
        t("literal:recommenderSystems"),
        t("literal:regression"),
        t("literal:scrum"),
        t("literal:sql"),
        t("literal:speechEnhancement"),
        t("literal:springFramework"),
        t("literal:systemDesign"),
        t("literal:tdd"),
        t("literal:tensorFlow"),
        t("literal:tomcat"),
        t("literal:typeScript"),
        t("literal:universalWindowsPlatform"),
        t("literal:xmpp"),
      ],
    }),
    [t, locations]
  );

  const text = useMemo<Text>(
    () => ({
      mastersTheses: [
        {
          kind: "thesis",
          title: t("text:mastersThesis"),
          releaseDate: new Date("Oct 27, 2017"),
          publication: "unicamp",
          keywordKeys: ["machineLearning", "multiTaskLearning", "clustering"],
          url: routes.urls.mastersThesis,
        },
      ],
      blogPosts: [
        {
          kind: "post",
          title: t("text:blogPosts.workspaceCollaboration"),
          releaseDate: new Date("Sep 25, 2019"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "changeRequests"],
          url: routes.urls.blogPosts.workspaceCollaboration,
        },
        {
          kind: "post",
          title: t("text:blogPosts.playingWithObjectDetection"),
          releaseDate: new Date("Oct 11, 2019"),
          publication: "towardsDataScience",
          keywordKeys: ["machineLearning", "computerVision", "objectDetection"],
          url: routes.urls.blogPosts.playingWithObjectDetection,
        },
        {
          kind: "post",
          title: t("text:blogPosts.randomVsGridSearch"),
          releaseDate: new Date("Nov 14, 2019"),
          publication: "towardsDataScience",
          keywordKeys: ["machineLearning", "optimization", "randomSearch"],
          url: routes.urls.blogPosts.randomVsGridSearch,
        },
        {
          kind: "post",
          title: t("text:blogPosts.mavenArchetypesInBC"),
          releaseDate: new Date("Jan 21, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "maven", "archetypes"],
          url: routes.urls.blogPosts.mavenArchetypesInBC,
        },
        {
          kind: "post",
          title: t("text:blogPosts.emptyReposInBC"),
          releaseDate: new Date("Feb 28, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "maven"],
          url: routes.urls.blogPosts.emptyReposInBC,
        },
        {
          kind: "post",
          title: t("text:blogPosts.squashCommitsInBC"),
          releaseDate: new Date("Feb 28, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "changeRequests"],
          url: routes.urls.blogPosts.squashCommitsInBC,
        },
        {
          kind: "post",
          title: t("text:blogPosts.improvedWorkflowInBC"),
          releaseDate: new Date("Mar 31, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "syncRepositories"],
          url: routes.urls.blogPosts.improvedWorkflowInBC,
        },
        {
          kind: "post",
          title: t("text:blogPosts.exportAsGist"),
          releaseDate: new Date("Apr 9, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "github", "dmn", "bpmn"],
          url: routes.urls.blogPosts.exportAsGist,
        },
        {
          kind: "post",
          title: t("text:blogPosts.backendKogitoTooling"),
          releaseDate: new Date("Sept 22, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "backend", "vsCode"],
          url: routes.urls.blogPosts.backendKogitoTooling,
        },
        {
          kind: "post",
          title: t("text:blogPosts.authoringOnGitpod"),
          releaseDate: new Date("Aug 9, 2021"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "gitpod", "bpmn", "dmn"],
          url: routes.urls.blogPosts.authoringOnGitpod,
        },
        {
          kind: "post",
          title: t("text:blogPosts.dmnDevSandbox"),
          releaseDate: new Date("Aug 23, 2021"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "dmn", "openShift"],
          url: routes.urls.blogPosts.dmnDevSandbox,
        },
        {
          kind: "post",
          title: t("text:blogPosts.teachableMachineBitingNails"),
          releaseDate: new Date("Jan 10, 2022"),
          publication: "towardsDataScience",
          keywordKeys: ["teachableMachine", "reactJs", "openShift"],
          url: routes.urls.blogPosts.teachableMachineBitingNails,
        },
        {
          kind: "post",
          title: t("text:blogPosts.deployKieSandboxToOpenshift"),
          releaseDate: new Date("Jan 27, 2022"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "openShift"],
          url: routes.urls.blogPosts.deployKieSandboxToOpenshift,
        },
      ],
    }),
    [t]
  );

  const talk = useMemo<Talk>(
    () => ({
      lives: [
        {
          kind: "live",
          title: t("talk:lives.workspaceCollaborationInBC"),
          releaseDate: new Date("Sept 8, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "changeRequests"],
          url: routes.urls.lives.workspaceCollaborationInBC,
        },
        {
          kind: "live",
          title: t("talk:lives.mavenArchetypesInBC"),
          releaseDate: new Date("Sept 15, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "maven", "archetypes"],
          url: routes.urls.lives.mavenArchetypesInBC,
        },
        {
          kind: "live",
          title: t("talk:lives.streamDecisionsWithDmnAndKafka"),
          releaseDate: new Date("Jun 8, 2021"),
          publication: "kieCommunity",
          keywordKeys: ["dmn", "openShift", "apacheKafka"],
          url: routes.urls.lives.streamDecisionsWithDmnAndKafka,
        },
      ],
      conferences: [
        {
          kind: "conference",
          title: t("talk:conferences.streamDecisionsWithDmnAndKafka"),
          releaseDate: new Date("Jun 8, 2021"),
          publication: "theDevelopersConference",
          keywordKeys: ["dmn", "openShift", "apacheKafka"],
          url: routes.slides.streamingDmnKafka,
        },
      ],
    }),
    [t]
  );

  const code = useMemo<Code>(
    () => ({
      repositories: [
        {
          kind: "code",
          title: t("code:repositories.bhc"),
          releaseDate: new Date("Feb 16, 2021"),
          publication: "gitHub",
          keywordKeys: ["python", "clustering", "bayesianStatistics"],
          url: routes.urls.repositories.bhc,
        },
        {
          kind: "code",
          title: t("code:repositories.vsCodeQuarkusDJL"),
          releaseDate: new Date("Oct 16, 2020"),
          publication: "gitHub",
          keywordKeys: ["computerVision", "quarkus", "vsCodeExtension", "typeScript"],
          url: routes.urls.repositories.vsCodeQuarkusDJL,
        },
        {
          kind: "code",
          title: t("code:repositories.lessIsMore"),
          releaseDate: new Date("Apr 10, 2021"),
          publication: "gitHub",
          keywordKeys: ["artifact", "gitHubActions", "typeScript"],
          url: routes.urls.repositories.lessIsMore,
        },
        {
          kind: "code",
          title: t("code:repositories.jupyterNotebooks"),
          releaseDate: new Date("Oct 8, 2019"),
          publication: "gitHub",
          keywordKeys: ["machineLearning", "jupyterNotebooks"],
          url: routes.urls.repositories.jupyterNotebooks,
        },
        {
          kind: "code",
          title: t("code:repositories.vsCodeDiffViewer"),
          releaseDate: new Date("Feb 23, 2021"),
          publication: "gitHub",
          keywordKeys: ["vsCodeExtension", "gitDiff", "typeScript"],
          url: routes.urls.repositories.vsCodeDiffViewer,
        },
        {
          kind: "code",
          title: t("code:repositories.vsCodeToxicityClassifier"),
          releaseDate: new Date("Sept 19, 2020"),
          publication: "gitHub",
          keywordKeys: ["vsCodeExtension", "tensorFlowJs", "typeScript"],
          url: routes.urls.repositories.vsCodeToxicityClassifier,
        },
        {
          kind: "code",
          title: t("code:repositories.streamDecisionsWithDmnAndKafka"),
          releaseDate: new Date("Jun 2, 2021"),
          publication: "gitHub",
          keywordKeys: ["apacheKafka", "dmn", "docker", "quarkus"],
          url: routes.urls.repositories.streamDecisionsWithDmnAndKafka,
        },
        {
          kind: "code",
          title: t("code:repositories.vsCodeObjectDetection"),
          releaseDate: new Date("Jul 4, 2020"),
          publication: "gitHub",
          keywordKeys: ["vsCodeExtension", "typeScript", "tensorFlowJs"],
          url: routes.urls.repositories.vsCodeObjectDetection,
        },
        {
          kind: "code",
          title: t("code:repositories.personalWebApp"),
          releaseDate: new Date("Oct 24, 2021"),
          publication: "gitHub",
          keywordKeys: ["reactJs", "typeScript", "webApp"],
          url: routes.urls.repositories.personalWebApp,
        },
        {
          kind: "code",
          title: t("code:repositories.teachableMachinePlayground"),
          releaseDate: new Date("Jan 9, 2022"),
          publication: "gitHub",
          keywordKeys: ["teachableMachine", "reactJs", "openShift"],
          url: routes.urls.repositories.teachableMachinePlayground,
        },
      ],
    }),
    [t]
  );

  return useMemo<AppSchema>(
    () => ({
      personal,
      about,
      journey,
      text,
      talk,
      code,
    }),
    [about, code, journey, personal, talk, text]
  );
}
