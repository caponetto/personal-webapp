import { Media } from "../common/Media";

export interface CodeData {
  keywords: string[];
  repositories: Media[];
}

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
  openShift: "OpenShift",
  python: "Python",
  quarkus: "Quarkus",
  reactJS: "ReactJS",
  teachableMachine: "Teachable Machine",
  tensorFlowJS: "TensorFlow JS",
  typescript: "Typescript",
  vsCodeExtension: "VS Code Extension",
  webApp: "Web App",
};

export const CODE_DATA: CodeData = {
  keywords: Object.values(codeKeywords),
  repositories: [
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
      url: "https://github.com/caponetto/streaming-dmn-kafka",
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
      releaseDate: new Date("Oct 24, 2021"),
      publishedAt: "GitHub",
      keywords: [codeKeywords.reactJS, codeKeywords.typescript, codeKeywords.webApp],
      url: "https://github.com/caponetto/personal-webapp",
    },
    {
      type: "code",
      title: "Teachable Machine Playground",
      releaseDate: new Date("Jan 9, 2022"),
      publishedAt: "GitHub",
      keywords: [codeKeywords.teachableMachine, codeKeywords.reactJS, codeKeywords.openShift],
      url: "https://github.com/caponetto/teachable-machine-playground",
    },
  ],
};
