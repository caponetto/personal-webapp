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
        url: "https://www.unicamp.br",
      },
      unifei: {
        name: t("literal:unifei"),
        url: "https://unifei.edu.br",
      },
      udacity: {
        name: t("literal:udacity"),
        url: "https://www.udacity.com",
      },
      oracle: {
        name: t("literal:oracle"),
        url: "https://www.oracle.com",
      },
      redHat: {
        name: t("literal:redHat"),
        url: "https://www.redhat.com",
      },
      samsung: {
        name: t("literal:samsung"),
        url: "https://www.samsung.com",
      },
      iFood: {
        name: t("literal:iFood"),
        url: "https://www.ifood.com.br",
      },
      motorola: {
        name: t("literal:motorola"),
        url: "https://www.motorola.com",
      },
      b2ml: {
        name: t("literal:b2mlSystems"),
        url: "https://www.b2ml.com.br",
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
        url: "https://www.google.com/maps/place/Brazil",
        emoji: "🇧🇷",
      },
      urls: {
        github: "https://github.com/caponetto",
        linkedin: "https://www.linkedin.com/in/ghcaponetto",
        twitter: "https://twitter.com/caponetto",
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
          url: "http://repositorio.unicamp.br/Acervo/Detalhe/987989",
        },
      ],
      patents: [
        {
          kind: "patent",
          title: t("text:patents.smartServices"),
          releaseDate: new Date("Mar 29, 2021"),
          publication: "uspto",
          keywordKeys: ["backend", "services", "editors", "browser"],
          url: "https://patents.google.com/patent/US20220308930A1",
        },
      ],
      blogPosts: [
        {
          kind: "post",
          title: t("text:blogPosts.workspaceCollaboration"),
          releaseDate: new Date("Sep 25, 2019"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "changeRequests"],
          url: "https://medium.com/kie-foundation/workspace-collaboration-via-change-requests-65b5fe96564e",
        },
        {
          kind: "post",
          title: t("text:blogPosts.playingWithObjectDetection"),
          releaseDate: new Date("Oct 11, 2019"),
          publication: "towardsDataScience",
          keywordKeys: ["machineLearning", "computerVision", "objectDetection"],
          url: "https://towardsdatascience.com/playing-with-object-detection-8f116ec0ce4d",
        },
        {
          kind: "post",
          title: t("text:blogPosts.randomVsGridSearch"),
          releaseDate: new Date("Nov 14, 2019"),
          publication: "towardsDataScience",
          keywordKeys: ["machineLearning", "optimization", "randomSearch"],
          url: "https://towardsdatascience.com/random-search-vs-grid-search-for-hyperparameter-optimization-345e1422899d",
        },
        {
          kind: "post",
          title: t("text:blogPosts.mavenArchetypesInBC"),
          releaseDate: new Date("Jan 21, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "maven", "archetypes"],
          url: "https://medium.com/kie-foundation/maven-archetype-support-in-business-central-b5fdf5e98556",
        },
        {
          kind: "post",
          title: t("text:blogPosts.emptyReposInBC"),
          releaseDate: new Date("Feb 28, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "maven"],
          url: "https://medium.com/kie-foundation/import-an-empty-repository-into-business-central-b3fb76bab103",
        },
        {
          kind: "post",
          title: t("text:blogPosts.squashCommitsInBC"),
          releaseDate: new Date("Feb 28, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "changeRequests"],
          url: "https://medium.com/kie-foundation/squash-commits-when-merging-a-change-request-bb8bcdc992c5",
        },
        {
          kind: "post",
          title: t("text:blogPosts.improvedWorkflowInBC"),
          releaseDate: new Date("Mar 31, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "syncRepositories"],
          url: "https://medium.com/kie-foundation/an-improved-development-workflow-on-business-central-using-our-new-devtools-48fb14f39be9",
        },
        {
          kind: "post",
          title: t("text:blogPosts.exportAsGist"),
          releaseDate: new Date("Apr 9, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "github", "dmn", "bpmn"],
          url: "https://medium.com/kie-foundation/exporting-diagrams-as-github-gists-a7c57b5f2b41",
        },
        {
          kind: "post",
          title: t("text:blogPosts.backendKogitoTooling"),
          releaseDate: new Date("Sept 22, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "backend", "vsCode"],
          url: "https://medium.com/kie-foundation/backend-support-on-kogito-tooling-8be682a60b88",
        },
        {
          kind: "post",
          title: t("text:blogPosts.authoringOnGitpod"),
          releaseDate: new Date("Aug 9, 2021"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "gitpod", "bpmn", "dmn"],
          url: "https://medium.com/@caponetto/four-steps-to-author-bpmn-and-dmn-assets-on-gitpod-io-2e0aa82b33d7",
        },
        {
          kind: "post",
          title: t("text:blogPosts.dmnDevSandbox"),
          releaseDate: new Date("Aug 23, 2021"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "dmn", "openShift"],
          url: "https://medium.com/@caponetto/deploy-decisions-to-dmn-developer-sandbox-62c7d051b871",
        },
        {
          kind: "post",
          title: t("text:blogPosts.teachableMachineBitingNails"),
          releaseDate: new Date("Jan 10, 2022"),
          publication: "towardsDataScience",
          keywordKeys: ["teachableMachine", "reactJs", "openShift"],
          url: "https://towardsdatascience.com/from-training-to-deployment-stop-biting-your-nails-with-machine-learning-ffed31a59040",
        },
        {
          kind: "post",
          title: t("text:blogPosts.deployKieSandboxToOpenshift"),
          releaseDate: new Date("Jan 27, 2022"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "openShift"],
          url: "https://medium.com/@caponetto/deploy-your-kie-sandbox-to-openshift-f0b8442d046d",
        },
        {
          kind: "post",
          title: t("text:blogPosts.deployDashboardsToOpenshift"),
          releaseDate: new Date("Jan 17, 2023"),
          publication: "kieCommunity",
          keywordKeys: ["kieTools", "openShift", "dashbuilder", "knative"],
          url: "https://medium.com/@caponetto/deploy-dashboards-to-openshift-58e5cf921f9d",
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
          title: t("talk:lives.multiplyingArchitecture"),
          releaseDate: new Date("Jun 29, 2023"),
          publication: "devNation",
          keywordKeys: ["frontend", "architecture", "editors"],
          url: "https://youtu.be/5XDKKGwtE98",
        },
        {
          kind: "live",
          title: t("talk:lives.workspaceCollaborationInBC"),
          releaseDate: new Date("Sept 8, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "git", "changeRequests"],
          url: "https://www.youtube.com/watch?v=wWpOKILLlZI",
        },
        {
          kind: "live",
          title: t("talk:lives.mavenArchetypesInBC"),
          releaseDate: new Date("Sept 15, 2020"),
          publication: "kieCommunity",
          keywordKeys: ["businessCentral", "maven", "archetypes"],
          url: "https://www.youtube.com/watch?v=E07RXxiZdYc",
        },
        {
          kind: "live",
          title: t("talk:lives.streamDecisionsWithDmnAndKafka"),
          releaseDate: new Date("Jun 8, 2021"),
          publication: "kieCommunity",
          keywordKeys: ["dmn", "openShift", "apacheKafka"],
          url: "https://www.youtube.com/watch?v=pgj4jmkAl5A",
        },
      ],
      conferences: [
        {
          kind: "conference",
          title: t("talk:conferences.streamDecisionsWithDmnAndKafka"),
          releaseDate: new Date("Jun 8, 2021"),
          publication: "theDevelopersConference",
          keywordKeys: ["dmn", "openShift", "apacheKafka"],
          url: routes.static.slides.streamingDmnKafka,
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
          url: "https://github.com/caponetto/bayesian-hierarchical-clustering",
        },
        {
          kind: "code",
          title: t("code:repositories.vsCodeQuarkusDJL"),
          releaseDate: new Date("Oct 16, 2020"),
          publication: "gitHub",
          keywordKeys: ["computerVision", "quarkus", "vsCodeExtension", "typeScript"],
          url: "https://github.com/caponetto/vscode-quarkus-djl",
        },
        {
          kind: "code",
          title: t("code:repositories.lessIsMore"),
          releaseDate: new Date("Apr 10, 2021"),
          publication: "gitHub",
          keywordKeys: ["artifact", "gitHubActions", "typeScript"],
          url: "https://github.com/caponetto/less-is-more",
        },
        {
          kind: "code",
          title: t("code:repositories.jupyterNotebooks"),
          releaseDate: new Date("Oct 8, 2019"),
          publication: "gitHub",
          keywordKeys: ["machineLearning", "jupyterNotebooks"],
          url: "https://github.com/caponetto/jupyter-notebooks",
        },
        {
          kind: "code",
          title: t("code:repositories.vsCodeDiffViewer"),
          releaseDate: new Date("Feb 23, 2021"),
          publication: "gitHub",
          keywordKeys: ["vsCodeExtension", "gitDiff", "typeScript"],
          url: "https://github.com/caponetto/vscode-diff-viewer",
        },
        {
          kind: "code",
          title: t("code:repositories.vsCodeToxicityClassifier"),
          releaseDate: new Date("Sept 19, 2020"),
          publication: "gitHub",
          keywordKeys: ["vsCodeExtension", "tensorFlowJs", "typeScript"],
          url: "https://github.com/caponetto/vscode-tfjs-toxicity",
        },
        {
          kind: "code",
          title: t("code:repositories.streamDecisionsWithDmnAndKafka"),
          releaseDate: new Date("Jun 2, 2021"),
          publication: "gitHub",
          keywordKeys: ["apacheKafka", "dmn", "docker", "quarkus"],
          url: "https://github.com/caponetto/streaming-dmn-kafka",
        },
        {
          kind: "code",
          title: t("code:repositories.vsCodeObjectDetection"),
          releaseDate: new Date("Jul 4, 2020"),
          publication: "gitHub",
          keywordKeys: ["vsCodeExtension", "typeScript", "tensorFlowJs"],
          url: "https://github.com/caponetto/vscode-tfjs-coco-ssd",
        },
        {
          kind: "code",
          title: t("code:repositories.personalWebApp"),
          releaseDate: new Date("Oct 24, 2021"),
          publication: "gitHub",
          keywordKeys: ["reactJs", "typeScript", "webApp"],
          url: "https://github.com/caponetto/personal-webapp",
        },
        {
          kind: "code",
          title: t("code:repositories.teachableMachinePlayground"),
          releaseDate: new Date("Jan 9, 2022"),
          publication: "gitHub",
          keywordKeys: ["teachableMachine", "reactJs", "openShift"],
          url: "https://github.com/caponetto/teachable-machine-playground",
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
