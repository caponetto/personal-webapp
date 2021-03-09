import { createContext, useContext, Dispatch } from "react";

export type ColorMode = "light" | "dark";
export const FULL_NAME = "Guilherme Caponetto";
export const COPYRIGHT = `© 2021 ${FULL_NAME}`;
export const DRAWER_WIDTH = 295;

export interface AppContextType {
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
