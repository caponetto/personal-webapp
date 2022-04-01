import React, { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./I18nForTests";

export function usingTestingI18nContext(children: ReactElement) {
  return {
    wrapper: <I18nextProvider i18n={i18n}>{children}</I18nextProvider>,
  };
}
