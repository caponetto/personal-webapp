import { createContext, Dispatch, useContext } from "react";
import { ColorMode } from "../colors";
import { AppData } from "../data";
import { OpenState, OpenStateAction } from "./OpenState";

export interface AppContextType {
  data: AppData;
  colorMode: ColorMode;
  updateColorMode: (colorMode: ColorMode) => void;
  openState: OpenState;
  openStateDispatch: Dispatch<OpenStateAction>;
  goTo: (route: string) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export function useApp() {
  return useContext(AppContext);
}
