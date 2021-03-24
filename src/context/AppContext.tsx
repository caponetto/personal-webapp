import { createContext, Dispatch, useContext } from "react";
import { PersonalData } from "../common/PersonalData";

export type ColorMode = "light" | "dark";
export const DRAWER_WIDTH = 300;

export interface AppContextType {
  data: PersonalData;
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
