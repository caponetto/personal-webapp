export type pages = "about" | "journey" | "text" | "talk" | "code";

export const routes = {
  nav: {
    root: "/",
    about: "/about",
    journey: "/journey",
    text: "/text",
    talk: "/talk",
    code: "/code",
    any: "*",
  },

  images: {
    avatar: "/static/images/avatar.webp",
    tds: "/static/images/tds.webp",
    kie: "/static/images/kie.webp",
    unicamp: {
      light: "/static/images/unicamp/light.webp",
      dark: "/static/images/unicamp/dark.webp",
    },
    tdc: "/static/images/tdc.webp",
    github: {
      light: "/static/images/github/light.webp",
      dark: "/static/images/github/dark.webp",
    },
  },

  slides: {
    streamingDmnKafka: "/static/slides/2021-06-streaming-decisions-with-dmn-and-kafka.pdf",
  },

  urls: {
    social: {
      twitter: "https://twitter.com/caponetto",
      linkedin: "https://www.linkedin.com/in/ghcaponetto",
      github: "https://github.com/caponetto",
    },
    mapsCountry: "https://www.google.com/maps/place/Brazil",
    unicamp: "https://www.unicamp.br",
    unifei: "https://unifei.edu.br",
    udacity: "https://www.udacity.com",
    oracle: "https://www.oracle.com",
    redHat: "https://www.redhat.com",
    samsung: "https://www.samsung.com",
    iFood: "https://www.ifood.com.br",
    motorola: "https://www.motorola.com",
    b2ml: "https://www.b2ml.com.br",
    mastersThesis: "http://repositorio.unicamp.br/Acervo/Detalhe/987989",
    blogPosts: {
      workspaceCollaboration:
        "https://medium.com/kie-foundation/workspace-collaboration-via-change-requests-65b5fe96564e",
      playingWithObjectDetection: "https://towardsdatascience.com/playing-with-object-detection-8f116ec0ce4d",
      randomVsGridSearch:
        "https://towardsdatascience.com/random-search-vs-grid-search-for-hyperparameter-optimization-345e1422899d",
      mavenArchetypesInBC: "https://medium.com/kie-foundation/maven-archetype-support-in-business-central-b5fdf5e98556",
      emptyReposInBC: "https://medium.com/kie-foundation/import-an-empty-repository-into-business-central-b3fb76bab103",
      squashCommitsInBC: "https://medium.com/kie-foundation/squash-commits-when-merging-a-change-request-bb8bcdc992c5",
      improvedWorkflowInBC:
        "https://medium.com/kie-foundation/an-improved-development-workflow-on-business-central-using-our-new-devtools-48fb14f39be9",
      exportAsGist: "https://medium.com/kie-foundation/exporting-diagrams-as-github-gists-a7c57b5f2b41",
      backendKogitoTooling: "https://medium.com/kie-foundation/backend-support-on-kogito-tooling-8be682a60b88",
      authoringOnGitpod:
        "https://medium.com/@caponetto/four-steps-to-author-bpmn-and-dmn-assets-on-gitpod-io-2e0aa82b33d7",
      dmnDevSandbox: "https://medium.com/@caponetto/deploy-decisions-to-dmn-developer-sandbox-62c7d051b871",
      teachableMachineBitingNails:
        "https://towardsdatascience.com/from-training-to-deployment-stop-biting-your-nails-with-machine-learning-ffed31a59040",
      deployKieSandboxToOpenshift: "https://medium.com/@caponetto/deploy-your-kie-sandbox-to-openshift-f0b8442d046d",
    },
    lives: {
      workspaceCollaborationInBC: "https://www.youtube.com/watch?v=wWpOKILLlZI",
      mavenArchetypesInBC: "https://www.youtube.com/watch?v=E07RXxiZdYc",
      streamDecisionsWithDmnAndKafka: "https://www.youtube.com/watch?v=pgj4jmkAl5A",
    },
    repositories: {
      bhc: "https://github.com/caponetto/bayesian-hierarchical-clustering",
      vsCodeQuarkusDJL: "https://github.com/caponetto/vscode-quarkus-djl",
      lessIsMore: "https://github.com/caponetto/less-is-more",
      jupyterNotebooks: "https://github.com/caponetto/jupyter-notebooks",
      vsCodeDiffViewer: "https://github.com/caponetto/vscode-diff-viewer",
      vsCodeToxicityClassifier: "https://github.com/caponetto/vscode-tfjs-toxicity",
      streamDecisionsWithDmnAndKafka: "https://github.com/caponetto/streaming-dmn-kafka",
      vsCodeObjectDetection: "https://github.com/caponetto/vscode-tfjs-coco-ssd",
      personalWebApp: "https://github.com/caponetto/personal-webapp",
      teachableMachinePlayground: "https://github.com/caponetto/teachable-machine-playground",
    },
  },
};
