import { blueGrey, grey, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode, useEffect, useMemo, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { ColorMode, Colors } from "../colors";
import { useCookie } from "../hooks/useCookie";
import { useSchema } from "../hooks/useSchema";
import { PageNames, routes } from "../routes";
import { AppContext } from "./AppContext";
import { OpenStateActions, openStateReducer } from "./OpenState";

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider(props: AppContextProviderProps) {
  const location = useLocation();
  const schema = useSchema();
  const { t } = useTranslation();

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
            default: colorMode === "light" ? Colors.WhiteGray : Colors.DarkGray,
          },
        },
      }),
    [colorMode]
  );

  useEffect(() => {
    updateShowSnackbar(openState.snackbar);
  }, [openState.snackbar, updateShowSnackbar]);

  useEffect(() => {
    openStateDispatch({ type: OpenStateActions.DRAWER_CLOSE });
  }, [location.pathname]);

  useEffect(() => {
    if (!Object.values(routes.nav).includes(location.pathname)) {
      return;
    }

    const relativePath = location.pathname.slice(1);
    if (!relativePath) {
      return;
    }

    const fullName = `${schema.personal.firstName} ${schema.personal.lastName}`;
    const pageName = t(`literal:${relativePath as PageNames}`);
    document.title = `${fullName} | ${pageName}`;
  }, [location.pathname, schema.personal, t]);

  const appContextValue = useMemo(
    () => ({
      schema,
      colorMode,
      openState,
      openStateDispatch,
      updateColorMode,
    }),
    [schema, colorMode, openState, updateColorMode]
  );

  return (
    <AppContext.Provider value={appContextValue}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppContext.Provider>
  );
}
