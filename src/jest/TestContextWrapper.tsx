import { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { AppContextProvider } from "../context/AppContextProvider";
import i18n from "./I18nForTests";

export function usingTestingI18nContext(children: ReactElement) {
  return {
    wrapper: <I18nextProvider i18n={i18n}>{children}</I18nextProvider>,
  };
}

export function usingTestingAppContext(children: ReactElement) {
  return {
    wrapper: <AppContextProvider>{children}</AppContextProvider>,
  };
}

export function usingTestingContext(children: ReactElement) {
  return usingTestingI18nContext(usingTestingAppContext(children).wrapper).wrapper;
}
