import { createContext, Dispatch, useContext } from "react";
import { ColorMode } from "../colors";
import { AppSchema } from "./AppSchema";
import { OpenState, OpenStateAction } from "./OpenState";

export interface AppContextType {
  schema: AppSchema;
  colorMode: ColorMode;
  openState: OpenState;
  openStateDispatch: Dispatch<OpenStateAction>;
  updateColorMode: Dispatch<ColorMode>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export function useApp() {
  return useContext(AppContext);
}
