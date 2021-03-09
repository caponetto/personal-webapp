import { routes } from "./Routes";

export type MediaType = "post" | "thesis" | "live" | "conference" | "code";
export type publication =
  | "KIE Community"
  | "Towards Data Science"
  | "UNICAMP"
  | "The Developer's Conference"
  | "GitHub";

export interface Media {
  type: MediaType;
  title: string;
  releaseDate: Date;
  publishedAt: publication;
  keywords: string[];
  url?: string;
}

const textKeyworkds = {
  archetypes: "Archetypes",
  backend: "Backend",
  bpmn: "BPMN",
  businessCentral: "Business Central",
  changeRequests: "Change Requests",
  clustering: "Clustering",
  computerVision: "Computer Vision",
  dmn: "DMN",
  git: "Git",
  github: "GitHub",
  gitpod: "Gitpod",
  kogitoTooling: "Kogito Tooling",
  machineLearning: "Machine Learning",
  maven: "Maven",
  multiTaskLearning: "Multi-Task Learning",
  objectDetection: "Object Detection",
  openshift: "Openshift",
  optimization: "Optimization",
  randomSearch: "Random Search",
  syncRepositories: "Sync Repositories",
  vsCode: "VS Code",
};

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

const codeKeywords = {
  apacheKafka: "Apache Kafka",
  artifact: "Artifact",
  bayesianStatistics: "Bayesian Statistics",
  clustering: "Clustering",
  computerVision: "Computer Vision",
  dmn: "DMN",
  docker: "Docker",
  gitDiff: "Git Diff",
  gitHubActions: "GitHub Actions",
  jupyterNotebooks: "Jupyter Notebooks",
  machineLearning: "Machine Learning",
  python: "Python",
  quarkus: "Quarkus",
  reactJS: "ReactJS",
  tensorFlowJS: "TensorFlow JS",
  typescript: "Typescript",
  vsCodeExtension: "VS Code Extension",
  webApp: "Web App",
};

export const masterThesis: Media = {
  type: "thesis",
  title: "Data-driven hierarchical structures in multi-task learning",
  releaseDate: new Date("Nov 30, 2017"),
  publishedAt: "UNICAMP",
  keywords: [textKeyworkds.machineLearning, textKeyworkds.multiTaskLearning, textKeyworkds.clustering],
  url: "http://repositorio.unicamp.br/jspui/handle/REPOSIP/330241?locale=en",
};

export const blogPosts: Media[] = [
  {
    type: "post",
    title: "Workspace collaboration via change requests",
    releaseDate: new Date("Sep 25, 2019"),
    publishedAt: "KIE Community",
    keywords: [textKeyworkds.businessCentral, textKeyworkds.git, textKeyworkds.changeRequests],
    url: "https://medium.com/kie-foundation/workspace-collaboration-via-change-requests-65b5fe96564e",
  },
  {
    type: "post",
    title: "Playing with object detection",
    releaseDate: new Date("Oct 11, 2019"),
    publishedAt: "Towards Data Science",
    keywords: [textKeyworkds.machineLearning, textKeyworkds.computerVision, textKeyworkds.objectDetection],
    url: "https://towardsdatascience.com/playing-with-object-detection-8f116ec0ce4d",
  },
  {
    type: "post",
    title: "Random Search vs Grid Search for hyperparameter optimization",
    releaseDate: new Date("Nov 14, 2019"),
    publishedAt: "Towards Data Science",
    keywords: [textKeyworkds.machineLearning, textKeyworkds.optimization, textKeyworkds.randomSearch],
    url: "https://towardsdatascience.com/random-search-vs-grid-search-for-hyperparameter-optimization-345e1422899d",
  },
  {
    type: "post",
    title: "Maven archetype support in Business Central",
    releaseDate: new Date("Jan 21, 2020"),
    publishedAt: "KIE Community",
    keywords: [textKeyworkds.businessCentral, textKeyworkds.maven, textKeyworkds.archetypes],
    url: "https://medium.com/kie-foundation/maven-archetype-support-in-business-central-b5fdf5e98556",
  },
  {
    type: "post",
    title: "Import an empty repository into Business Central",
    releaseDate: new Date("Feb 28, 2020"),
    publishedAt: "KIE Community",
    keywords: [textKeyworkds.businessCentral, textKeyworkds.git, textKeyworkds.maven],
    url: "https://medium.com/kie-foundation/import-an-empty-repository-into-business-central-b3fb76bab103",
  },
  {
    type: "post",
    title: "Squash commits when merging a change request",
    releaseDate: new Date("Feb 28, 2020"),
    publishedAt: "KIE Community",
    keywords: [textKeyworkds.businessCentral, textKeyworkds.git, textKeyworkds.changeRequests],
    url: "https://medium.com/kie-foundation/squash-commits-when-merging-a-change-request-bb8bcdc992c5",
  },
  {
    type: "post",
    title: "An improved development workflow on Business Central using our new DevTools",
    releaseDate: new Date("Mar 31, 2020"),
    publishedAt: "KIE Community",
    keywords: [textKeyworkds.businessCentral, textKeyworkds.git, textKeyworkds.syncRepositories],
    url: "https://medium.com/kie-foundation/an-improved-development-workflow-on-business-central-using-our-new-devtools-48fb14f39be9",
  },
  {
    type: "post",
    title: "Exporting diagrams as GitHub gists",
    releaseDate: new Date("Apr 9, 2020"),
    publishedAt: "KIE Community",
    keywords: [textKeyworkds.kogitoTooling, textKeyworkds.github, textKeyworkds.dmn, textKeyworkds.bpmn],
    url: "https://medium.com/kie-foundation/exporting-diagrams-as-github-gists-a7c57b5f2b41",
  },
  {
    type: "post",
    title: "Backend support on Kogito Tooling",
    releaseDate: new Date("Sept 22, 2020"),
    publishedAt: "KIE Community",
    keywords: [textKeyworkds.kogitoTooling, textKeyworkds.backend, textKeyworkds.vsCode],
    url: "https://medium.com/kie-foundation/backend-support-on-kogito-tooling-8be682a60b88",
  },
  {
    type: "post",
    title: "Four steps to author BPMN and DMN assets on gitpod.io",
    releaseDate: new Date("Aug 9, 2021"),
    publishedAt: "KIE Community",
    keywords: [textKeyworkds.kogitoTooling, textKeyworkds.gitpod, textKeyworkds.bpmn, textKeyworkds.dmn],
    url: "https://medium.com/@caponetto/four-steps-to-author-bpmn-and-dmn-assets-on-gitpod-io-2e0aa82b33d7",
  },
  {
    type: "post",
    title: "Deploy decisions to DMN Developer Sandbox",
    releaseDate: new Date("Aug 23, 2021"),
    publishedAt: "KIE Community",
    keywords: [textKeyworkds.kogitoTooling, textKeyworkds.dmn, textKeyworkds.openshift],
    url: "https://medium.com/@caponetto/deploy-decisions-to-dmn-developer-sandbox-62c7d051b871",
  },
];

export const lives: Media[] = [
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
];

export const conferences: Media[] = [
  {
    type: "conference",
    title: "Streaming suas decisões com DMN e Kafka (pt-BR)",
    releaseDate: new Date("Jun 8, 2021"),
    publishedAt: "The Developer's Conference",
    keywords: [talkKeywords.dmn, talkKeywords.openshift, talkKeywords.apacheKafka],
    url: routes.slides.streamingDmnKafka,
  },
];

export const repositories: Media[] = [
  {
    type: "code",
    title: "Bayesian Hierarchical Clustering",
    releaseDate: new Date("Feb 16, 2021"),
    publishedAt: "GitHub",
    keywords: [codeKeywords.python, codeKeywords.clustering, codeKeywords.bayesianStatistics],
    url: "https://github.com/caponetto/bayesian-hierarchical-clustering",
  },
  {
    type: "code",
    title: "Editor services on VS Code with Quarkus and DJL",
    releaseDate: new Date("Oct 16, 2020"),
    publishedAt: "GitHub",
    keywords: [
      codeKeywords.computerVision,
      codeKeywords.quarkus,
      codeKeywords.vsCodeExtension,
      codeKeywords.typescript,
    ],
    url: "https://github.com/caponetto/vscode-quarkus-djl",
  },
  {
    type: "code",
    title: "Less is more",
    releaseDate: new Date("Apr 10, 2021"),
    publishedAt: "GitHub",
    keywords: [codeKeywords.artifact, codeKeywords.gitHubActions, codeKeywords.typescript],
    url: "https://github.com/caponetto/less-is-more",
  },
  {
    type: "code",
    title: "Jupyter Notebooks",
    releaseDate: new Date("Oct 8, 2019"),
    publishedAt: "GitHub",
    keywords: [codeKeywords.machineLearning, codeKeywords.jupyterNotebooks],
    url: "https://github.com/caponetto/jupyter-notebooks",
  },
  {
    type: "code",
    title: "VS Code Diff Viewer",
    releaseDate: new Date("Feb 23, 2021"),
    publishedAt: "GitHub",
    keywords: [codeKeywords.vsCodeExtension, codeKeywords.gitDiff, codeKeywords.typescript],
    url: "https://github.com/caponetto/vscode-diff-viewer",
  },
  {
    type: "code",
    title: "VS Code Toxicity classifier",
    releaseDate: new Date("Sept 19, 2020"),
    publishedAt: "GitHub",
    keywords: [codeKeywords.vsCodeExtension, codeKeywords.tensorFlowJS, codeKeywords.typescript],
    url: "https://github.com/caponetto/vscode-tfjs-toxicity",
  },
  {
    type: "code",
    title: "Streaming decisions with DMN and Kafka",
    releaseDate: new Date("Jun 2, 2021"),
    publishedAt: "GitHub",
    keywords: [codeKeywords.apacheKafka, codeKeywords.dmn, codeKeywords.docker, codeKeywords.quarkus],
    url: "https://github.com/caponetto/vscode-tfjs-toxicity",
  },
  {
    type: "code",
    title: "VS Code Object Detection",
    releaseDate: new Date("Jul 4, 2020"),
    publishedAt: "GitHub",
    keywords: [codeKeywords.vsCodeExtension, codeKeywords.typescript, codeKeywords.tensorFlowJS],
    url: "https://github.com/caponetto/vscode-tfjs-coco-ssd",
  },
  {
    type: "code",
    title: "This web app :)",
    releaseDate: new Date("Jul 4, 2020"), // TODO FIX DATE
    publishedAt: "GitHub",
    keywords: [codeKeywords.reactJS, codeKeywords.typescript, codeKeywords.webApp],
    url: "https://github.com/caponetto/personal-webapp",
  },
];

export const textKeywordArray = Object.values(textKeyworkds);
export const talkKeywordArray = Object.values(talkKeywords);
export const codeKeywordArray = Object.values(codeKeywords);
