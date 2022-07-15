import { createContext, useContext } from "react";
import { ColorMode } from "../colors";
import { AppSchema } from "./AppSchema";
import { OpenState } from "./OpenState";

export interface AppContextType {
  schema: AppSchema;
  colorMode: ColorMode;
  openState: OpenState;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export function useApp() {
  return useContext(AppContext);
}
