export type PageNames = "about" | "journey" | "text" | "talk" | "code";

export const routes = {
  nav: {
    about: "/about",
    journey: "/journey",
    text: "/text",
    talk: "/talk",
    code: "/code",
  },

  static: {
    images: {
      avatar: "static/images/avatar.webp",
      tds: "static/images/tds.webp",
      kie: "static/images/kie.webp",
      unicamp: {
        light: "static/images/unicamp/light.webp",
        dark: "static/images/unicamp/dark.webp",
      },
      tdc: "static/images/tdc.webp",
      github: {
        light: "static/images/github/light.webp",
        dark: "static/images/github/dark.webp",
      },
    },
    slides: {
      streamingDmnKafka: "static/slides/2021-06-streaming-decisions-with-dmn-and-kafka.pdf",
    },
  },
};
