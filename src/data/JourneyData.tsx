import { Journey } from "../common/Journey";

export interface JourneyData {
  education: Journey[];
  certification: Journey[];
  experience: Journey[];
  toolbox: string[];
}

const locations = {
  unicamp: {
    name: "UNICAMP",
    url: "https://www.unicamp.br",
  },
  unifei: {
    name: "UNIFEI",
    url: "https://unifei.edu.br",
  },
  udacity: {
    name: "Udacity",
    url: "https://www.udacity.com",
  },
  oracle: {
    name: "Oracle",
    url: "https://www.oracle.com",
  },
  redHat: {
    name: "Red Hat",
    url: "https://www.redhat.com",
  },
  samsung: {
    name: "Samsung",
    url: "https://www.samsung.com",
  },
  ifood: {
    name: "iFood",
    url: "https://www.ifood.com.br",
  },
  motorola: {
    name: "Motorola",
    url: "https://www.motorola.com",
  },
  b2ml: {
    name: "B2ML Sistemas",
    url: "https://www.b2ml.com.br",
  },
};

export const JOURNEY_DATA: JourneyData = {
  education: [
    {
      title: "M.Sc. in Machine Learning",
      period: {
        start: 2017,
      },
      location: locations.unicamp,
    },
    {
      title: "B.Sc. in Computer Science",
      period: {
        start: 2011,
      },
      location: locations.unifei,
    },
  ],
  certification: [
    {
      title: "Computer Vision Nanodegree",
      period: {
        start: 2019,
      },
      location: locations.udacity,
    },
    {
      title: "Oracle Certified Professional, Java 6",
      period: {
        start: 2012,
      },
      location: locations.oracle,
    },
  ],
  experience: [
    {
      title: "SW Engineer → Senior SW Engineer",
      period: {
        start: 2019,
        end: "Present",
      },
      location: locations.redHat,
    },
    {
      title: "SW Engineer → Senior SW Engineer",
      period: {
        start: 2017,
        end: 2019,
      },
      location: locations.samsung,
    },
    {
      title: "SW Engineer",
      period: {
        start: 2017,
        end: 2017,
      },
      location: locations.ifood,
    },
    {
      title: "Graduate Researcher",
      period: {
        start: 2015,
        end: 2017,
      },
      location: locations.unicamp,
    },
    {
      title: "Junior SW Engineer",
      period: {
        start: 2012,
        end: 2015,
      },
      location: locations.samsung,
    },
    {
      title: "SW Development Intern",
      period: {
        start: 2011,
        end: 2011,
      },
      location: locations.motorola,
    },
    {
      title: "Undergraduate Researcher",
      period: {
        start: 2007,
        end: 2010,
      },
      location: locations.unifei,
    },
    {
      title: "SW Development Intern",
      period: {
        start: 2007,
        end: 2007,
      },
      location: locations.b2ml,
    },
  ],
  toolbox: [
    "Amazon Web Services",
    "Android",
    "Apache Kafka",
    "Architecture",
    "Back-end",
    "C#",
    "C++",
    "CSS",
    "Classification",
    "Clustering",
    "Computer Vision",
    "CI/CD",
    "Deep Learning",
    "Design Patterns",
    "Docker",
    "Front-end",
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
    "OpenShift",
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
    "System Design",
    "TDD",
    "TensorFlow",
    "Tomcat",
    "TypeScript",
    "Universal Windows Platform",
    "XMPP",
  ],
};
