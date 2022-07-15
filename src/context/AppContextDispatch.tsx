import { createContext, Dispatch, useContext } from "react";
import { ColorMode } from "../colors";
import { OpenStateAction } from "./OpenState";

export interface AppContextDispatchType {
  openStateDispatch: Dispatch<OpenStateAction>;
  updateColorMode: (colorMode: ColorMode) => void;
  goTo: (route: string) => void;
}

export const AppContextDispatch = createContext<AppContextDispatchType>({} as AppContextDispatchType);

export function useAppDispatch() {
  return useContext(AppContextDispatch);
}
