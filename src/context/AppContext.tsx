import { createContext, Dispatch, useContext } from "react";
import { ColorMode } from "../colors";
import { AppSchema } from "../schema";
import { OpenState, OpenStateAction } from "./OpenState";

export interface AppContextType {
  schema: AppSchema;
  colorMode: ColorMode;
  openState: OpenState;
  openStateDispatch: Dispatch<OpenStateAction>;
  updateColorMode: Dispatch<ColorMode>;
}

export const SchemaContext = createContext<AppSchema | undefined>(undefined);

export interface ThemeModeContextType {
  colorMode: ColorMode;
  updateColorMode: Dispatch<ColorMode>;
}

export const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export interface UiStateContextType {
  openState: OpenState;
  openStateDispatch: Dispatch<OpenStateAction>;
}

export const UiStateContext = createContext<UiStateContextType | undefined>(undefined);

export function useSchemaContext() {
  const context = useContext(SchemaContext);
  if (!context) {
    throw new Error("useSchemaContext must be used within an AppContextProvider");
  }

  return context;
}

export function useThemeModeContext() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeModeContext must be used within an AppContextProvider");
  }

  return context;
}

export function useUiStateContext() {
  const context = useContext(UiStateContext);
  if (!context) {
    throw new Error("useUiStateContext must be used within an AppContextProvider");
  }

  return context;
}

export function useApp(): AppContextType {
  const schema = useSchemaContext();
  const { colorMode, updateColorMode } = useThemeModeContext();
  const { openState, openStateDispatch } = useUiStateContext();

  return {
    schema,
    colorMode,
    openState,
    openStateDispatch,
    updateColorMode,
  };
}
