import { PersonalData } from "./PersonalData";
import { routes } from "./Routes";

const textKeywords = {
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
  kieTools: "KIE Tools",
  machineLearning: "Machine Learning",
  maven: "Maven",
  multiTaskLearning: "Multi-Task Learning",
  objectDetection: "Object Detection",
  openshift: "Openshift",
  optimization: "Optimization",
  randomSearch: "Random Search",
  reactjs: "ReactJS",
  syncRepositories: "Sync Repositories",
  teachableMachine: "Teachable Machine",
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

export const PERSONAL_DATA: PersonalData = {
  fullName: "Guilherme Caponetto",
  location: {
    country: "Brazil",
    flag: "🇧🇷",
    url: routes.urls.mapsCountry,
  },
  about: {
    paragraphs: [
      "Since my freshman year of university (2007), I have been working with both back-end and front-end development. I am not attached to any specific programming language or technology, so I am more than happy as long as I am coding and learning.",
      "During my journey, I have had the opportunity to contribute to academic and professional projects, most of them related to Web, Windows, and Android. Conducting research, especially focusing on Machine Learning, is also something that I enjoy doing.",
      "My interests lie in the development of high-quality intelligent software using design patterns, optimized code guided by unit tests, machine learning, and agile methodologies. I take ownership of projects that I am involved with, I enjoy sharing my knowledge with others, and I have a passion for learning new things.",
    ],
    skills: [
      "Amazon Web Services",
      "Android",
      "Apache Kafka",
      "C#",
      "C++",
      "CSS",
      "Classification",
      "Clustering",
      "Computer Vision",
      "Continuous Integration",
      "Deep Learning",
      "Design Patterns",
      "Docker",
      "GWT",
      "Git",
      "HTML",
      "JBoss",
      "JNI",
      "JPA",
      "Java",
      "JavaScript",
      "Kanban",
      "MATLAB",
      "Machine Learning",
      "Multi-Task Learning",
      "Neural Networks",
      "NoSQL",
      "NodeJS",
      "OOP",
      "Optimization",
      "Python",
      "Quarkus",
      "RESTful WS",
      "ReactJS",
      "Recommender Systems",
      "Regression",
      "Scrum",
      "SQL",
      "Speech Enhancement",
      "Spring Framework",
      "TDD",
      "Tomcat",
      "TypeScript",
      "Universal Windows Platform",
      "XMPP",
    ],
  },
  journey: {
    education: [
      {
        title: "M.Sc. in Computer Engineering",
        period: {
          start: "2017",
        },
        location: "UNICAMP",
      },
      {
        title: "B.Sc. in Computer Science",
        period: {
          start: "2011",
        },
        location: "UNIFEI",
      },
    ],
    certification: [
      {
        title: "Computer Vision Nanodegree",
        period: {
          start: "2019",
        },
        location: "Udacity",
      },
      {
        title: "Oracle Certified Professional, Java 6",
        period: {
          start: "2012",
        },
        location: "Oracle",
      },
    ],
    experience: [
      {
        title: "SW Engineer → Senior SW Engineer",
        period: {
          start: "2019",
          end: "Present",
        },
        location: "Red Hat",
      },
      {
        title: "SW Engineer → Senior SW Engineer",
        period: {
          start: "2017",
          end: "2019",
        },
        location: "Samsung",
      },
      {
        title: "SW Engineer",
        period: {
          start: "2017",
          end: "2017",
        },
        location: "iFood",
      },
      {
        title: "Graduate Researcher",
        period: {
          start: "2015",
          end: "2017",
        },
        location: "UNICAMP",
      },
      {
        title: "Junior SW Engineer",
        period: {
          start: "2012",
          end: "2015",
        },
        location: "Samsung",
      },
      {
        title: "SW Development Intern",
        period: {
          start: "2011",
          end: "2011",
        },
        location: "Motorola",
      },
      {
        title: "Undergraduate Researcher",
        period: {
          start: "2007",
          end: "2010",
        },
        location: "UNIFEI",
      },
      {
        title: "SW Development Intern",
        period: {
          start: "2007",
          end: "2007",
        },
        location: "B2ML Systems",
      },
    ],
  },
  text: {
    keywords: Object.values(textKeywords),
    masterThesis: {
      type: "thesis",
      title: "Data-driven hierarchical structures in multi-task learning",
      releaseDate: new Date("Oct 27, 2017"),
      publishedAt: "UNICAMP",
      keywords: [textKeywords.machineLearning, textKeywords.multiTaskLearning, textKeywords.clustering],
      url: "http://repositorio.unicamp.br/Acervo/Detalhe/987989",
    },
    blogPosts: [
      {
        type: "post",
        title: "Workspace collaboration via change requests",
        releaseDate: new Date("Sep 25, 2019"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.businessCentral, textKeywords.git, textKeywords.changeRequests],
        url: "https://medium.com/kie-foundation/workspace-collaboration-via-change-requests-65b5fe96564e",
      },
      {
        type: "post",
        title: "Playing with object detection",
        releaseDate: new Date("Oct 11, 2019"),
        publishedAt: "Towards Data Science",
        keywords: [textKeywords.machineLearning, textKeywords.computerVision, textKeywords.objectDetection],
        url: "https://towardsdatascience.com/playing-with-object-detection-8f116ec0ce4d",
      },
      {
        type: "post",
        title: "Random Search vs Grid Search for hyperparameter optimization",
        releaseDate: new Date("Nov 14, 2019"),
        publishedAt: "Towards Data Science",
        keywords: [textKeywords.machineLearning, textKeywords.optimization, textKeywords.randomSearch],
        url: "https://towardsdatascience.com/random-search-vs-grid-search-for-hyperparameter-optimization-345e1422899d",
      },
      {
        type: "post",
        title: "Maven archetype support in Business Central",
        releaseDate: new Date("Jan 21, 2020"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.businessCentral, textKeywords.maven, textKeywords.archetypes],
        url: "https://medium.com/kie-foundation/maven-archetype-support-in-business-central-b5fdf5e98556",
      },
      {
        type: "post",
        title: "Import an empty repository into Business Central",
        releaseDate: new Date("Feb 28, 2020"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.businessCentral, textKeywords.git, textKeywords.maven],
        url: "https://medium.com/kie-foundation/import-an-empty-repository-into-business-central-b3fb76bab103",
      },
      {
        type: "post",
        title: "Squash commits when merging a change request",
        releaseDate: new Date("Feb 28, 2020"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.businessCentral, textKeywords.git, textKeywords.changeRequests],
        url: "https://medium.com/kie-foundation/squash-commits-when-merging-a-change-request-bb8bcdc992c5",
      },
      {
        type: "post",
        title: "An improved development workflow on Business Central using our new DevTools",
        releaseDate: new Date("Mar 31, 2020"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.businessCentral, textKeywords.git, textKeywords.syncRepositories],
        url: "https://medium.com/kie-foundation/an-improved-development-workflow-on-business-central-using-our-new-devtools-48fb14f39be9",
      },
      {
        type: "post",
        title: "Exporting diagrams as GitHub gists",
        releaseDate: new Date("Apr 9, 2020"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.kieTools, textKeywords.github, textKeywords.dmn, textKeywords.bpmn],
        url: "https://medium.com/kie-foundation/exporting-diagrams-as-github-gists-a7c57b5f2b41",
      },
      {
        type: "post",
        title: "Backend support on Kogito Tooling",
        releaseDate: new Date("Sept 22, 2020"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.kieTools, textKeywords.backend, textKeywords.vsCode],
        url: "https://medium.com/kie-foundation/backend-support-on-kogito-tooling-8be682a60b88",
      },
      {
        type: "post",
        title: "Four steps to author BPMN and DMN assets on gitpod.io",
        releaseDate: new Date("Aug 9, 2021"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.kieTools, textKeywords.gitpod, textKeywords.bpmn, textKeywords.dmn],
        url: "https://medium.com/@caponetto/four-steps-to-author-bpmn-and-dmn-assets-on-gitpod-io-2e0aa82b33d7",
      },
      {
        type: "post",
        title: "Deploy decisions to DMN Developer Sandbox",
        releaseDate: new Date("Aug 23, 2021"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.kieTools, textKeywords.dmn, textKeywords.openshift],
        url: "https://medium.com/@caponetto/deploy-decisions-to-dmn-developer-sandbox-62c7d051b871",
      },
      {
        type: "post",
        title: "From training to deployment: Stop biting your nails with machine learning",
        releaseDate: new Date("Jan 10, 2022"),
        publishedAt: "Towards Data Science",
        keywords: [textKeywords.teachableMachine, textKeywords.reactjs, textKeywords.openshift],
        url: "https://towardsdatascience.com/from-training-to-deployment-stop-biting-your-nails-with-machine-learning-ffed31a59040",
      },
      {
        type: "post",
        title: "Deploy your KIE Sandbox to OpenShift",
        releaseDate: new Date("Jan 27, 2022"),
        publishedAt: "KIE Community",
        keywords: [textKeywords.kieTools, textKeywords.openshift],
        url: "https://medium.com/@caponetto/deploy-your-kie-sandbox-to-openshift-f0b8442d046d",
      },
    ],
  },
  talk: {
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
  },
  code: {
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
  },
};
