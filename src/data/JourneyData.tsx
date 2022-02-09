import { Journey } from "../common/Journey";

export interface JourneyData {
  education: Journey[];
  certification: Journey[];
  experience: Journey[];
  toolbox: string[];
}

export const JOURNEY_DATA: JourneyData = {
  education: [
    {
      title: "M.Sc. in Computer Engineering",
      period: {
        start: 2017,
      },
      location: "UNICAMP",
    },
    {
      title: "B.Sc. in Computer Science",
      period: {
        start: 2011,
      },
      location: "UNIFEI",
    },
  ],
  certification: [
    {
      title: "Computer Vision Nanodegree",
      period: {
        start: 2019,
      },
      location: "Udacity",
    },
    {
      title: "Oracle Certified Professional, Java 6",
      period: {
        start: 2012,
      },
      location: "Oracle",
    },
  ],
  experience: [
    {
      title: "SW Engineer → Senior SW Engineer",
      period: {
        start: 2019,
        end: "Present",
      },
      location: "Red Hat",
    },
    {
      title: "SW Engineer → Senior SW Engineer",
      period: {
        start: 2017,
        end: 2019,
      },
      location: "Samsung",
    },
    {
      title: "SW Engineer",
      period: {
        start: 2017,
        end: 2017,
      },
      location: "iFood",
    },
    {
      title: "Graduate Researcher",
      period: {
        start: 2015,
        end: 2017,
      },
      location: "UNICAMP",
    },
    {
      title: "Junior SW Engineer",
      period: {
        start: 2012,
        end: 2015,
      },
      location: "Samsung",
    },
    {
      title: "SW Development Intern",
      period: {
        start: 2011,
        end: 2011,
      },
      location: "Motorola",
    },
    {
      title: "Undergraduate Researcher",
      period: {
        start: 2007,
        end: 2010,
      },
      location: "UNIFEI",
    },
    {
      title: "SW Development Intern",
      period: {
        start: 2007,
        end: 2007,
      },
      location: "B2ML Systems",
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
