import { createContext, Dispatch, useContext } from "react";
import { AppData } from "../app/AppData";

export type ColorMode = "light" | "dark";
export const DRAWER_WIDTH = 300;

export interface AppContextType {
  data: AppData;
  isLight: boolean;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<boolean>;
  toggleColorMode: () => void;
  goTo: (route: string) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export function useApp() {
  return useContext(AppContext);
}
