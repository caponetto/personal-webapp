import { createContext, Dispatch, useContext } from "react";
import { AboutData, CodeData, JourneyData, PersonalData, TalkData, TextData } from "../data/Data";

interface AppData {
  personal: PersonalData;
  about: AboutData;
  journey: JourneyData;
  text: TextData;
  talk: TalkData;
  code: CodeData;
}

export type ColorMode = "light" | "dark";
export const DRAWER_WIDTH = 300;
export const DRAWER_ITEM_WIDTH = DRAWER_WIDTH - 16;

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
