import React from "react";
import { renderHook } from "@testing-library/react";
import { ColorMode } from "../../colors";
import { AppSchema } from "../../schema";
import { OpenState } from "../OpenState";
import {
  AppContextType,
  SchemaContext,
  ThemeModeContext,
  ThemeModeContextType,
  UiStateContext,
  UiStateContextType,
  useApp,
} from "../AppContext";

const APP_SCHEMA: AppSchema = {
  personal: {
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.dev",
    country: { name: "Brazil", url: "https://example.com/brazil", emoji: "🇧🇷" },
    urls: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      x: "https://x.com/johndoe",
    },
  },
  about: {
    welcome: "welcome",
    paragraphs: ["paragraph"],
  },
  journey: {
    award: [],
    education: [],
    certification: [],
    experience: [],
    toolbox: [],
  },
  text: {
    mastersTheses: [],
    patents: [],
    blogPosts: [],
  },
  talk: {
    lives: [],
    conferences: [],
  },
  code: {
    repositories: [],
  },
};

const OPEN_STATE: OpenState = {
  drawer: false,
  settings: false,
  snackbar: false,
};

const THEME_MODE_CONTEXT_VALUE: ThemeModeContextType = {
  colorMode: "light" as ColorMode,
  updateColorMode: () => undefined,
};

const UI_STATE_CONTEXT_VALUE: UiStateContextType = {
  openState: OPEN_STATE,
  openStateDispatch: () => undefined,
};

const APP_CONTEXT_VALUE: AppContextType = {
  schema: APP_SCHEMA,
  ...THEME_MODE_CONTEXT_VALUE,
  ...UI_STATE_CONTEXT_VALUE,
};

describe("AppContext", () => {
  it("should throw when useApp is used outside AppContextProvider", () => {
    expect(() => renderHook(() => useApp())).toThrow(/AppContextProvider/);
  });

  it("should return context when used within AppContextProvider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SchemaContext.Provider value={APP_SCHEMA}>
        <ThemeModeContext.Provider value={THEME_MODE_CONTEXT_VALUE}>
          <UiStateContext.Provider value={UI_STATE_CONTEXT_VALUE}>{children}</UiStateContext.Provider>
        </ThemeModeContext.Provider>
      </SchemaContext.Provider>
    );
    const { result } = renderHook(() => useApp(), { wrapper });

    expect(result.current).toEqual(APP_CONTEXT_VALUE);
  });
});
