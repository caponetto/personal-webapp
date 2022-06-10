import { createContext, Dispatch, useContext } from "react";
import { AppData } from "../data";
import { OpenState, OpenStateAction } from "./OpenState";

export type ColorMode = "light" | "dark";

export const DRAWER_WIDTH = 300;
export const DRAWER_ITEM_WIDTH = DRAWER_WIDTH - 16;

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
