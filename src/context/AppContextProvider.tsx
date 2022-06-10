import { blueGrey, grey, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { DARK_GRAY, WHITE_GRAY } from "../colors";
import { useCookie } from "../hooks/useCookies";
import { useData } from "../hooks/useData";
import { pages, routes } from "../routes";
import { AppContext, ColorMode } from "./AppContext";
import { OpenStateActions, openStateReducer } from "./OpenState";

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider(props: AppContextProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const data = useData();

  const [colorMode, updateColorMode] = useCookie<ColorMode>("color_mode", "light");
  const [showSnackbar, updateShowSnackbar] = useCookie<boolean>("show_snackbar", navigator.cookieEnabled);

  const [openState, openStateDispatch] = useReducer(openStateReducer, {
    drawer: false,
    settings: false,
    snackbar: showSnackbar,
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: blueGrey[500],
          },
          success: {
            main: colorMode === "light" ? teal[700] : grey[500],
          },
          info: {
            main: colorMode === "light" ? grey[700] : grey[600],
          },
          mode: colorMode,
          background: {
            default: colorMode === "light" ? WHITE_GRAY : DARK_GRAY,
          },
        },
      }),
    [colorMode]
  );

  const goTo = useCallback(
    (route: string) => {
      if (location.pathname === route) {
        return;
      }
      navigate(route);
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    updateShowSnackbar(openState.snackbar);
  }, [openState.snackbar, updateShowSnackbar]);

  useEffect(() => {
    openStateDispatch({ type: OpenStateActions.DRAWER_CLOSE });
  }, [location.pathname]);

  useEffect(() => {
    const relativePath = location.pathname.slice(1);
    if (!relativePath || !Object.values(routes.nav).includes(location.pathname)) {
      return;
    }

    const fullName = t("personal:fullName");
    const pageName = t(`literal:${relativePath as pages}`);
    document.title = `${fullName} | ${pageName}`;
  }, [location.pathname, t]);

  const contextValue = useMemo(
    () => ({
      data,
      colorMode,
      updateColorMode,
      openState,
      openStateDispatch,
      goTo,
    }),
    [data, colorMode, updateColorMode, openState, goTo]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppContext.Provider>
  );
}
