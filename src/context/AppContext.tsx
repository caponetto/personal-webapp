import { createContext, Dispatch, useContext } from "react";
import { ColorMode } from "../colors";
import { About, Code, Journey, Personal, Talk, Text } from "../schema";
import { OpenState, OpenStateAction } from "./OpenState";

export interface AppSchema {
  personal: Personal;
  about: About;
  journey: Journey;
  text: Text;
  talk: Talk;
  code: Code;
}

export interface AppContextType {
  schema: AppSchema;
  colorMode: ColorMode;
  openState: OpenState;
}

export interface AppContextDispatchType {
  openStateDispatch: Dispatch<OpenStateAction>;
  updateColorMode: (colorMode: ColorMode) => void;
  goTo: (route: string) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextDispatch = createContext<AppContextDispatchType>({} as AppContextDispatchType);

export function useApp() {
  return useContext(AppContext);
}

export function useAppDispatch() {
  return useContext(AppContextDispatch);
}
