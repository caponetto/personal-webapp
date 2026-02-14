import { blueGrey, grey, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode, useEffect, useMemo, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { ColorMode, Colors } from "../colors";
import { isLocalStorageAvailable, useLocalStorage } from "../hooks/useLocalStorage";
import { useSchema } from "../hooks/useSchema";
import { PageNames, routes } from "../routes";
import { SchemaContext, ThemeModeContext, UiStateContext } from "./AppContext";
import { OpenStateActions, openStateReducer } from "./OpenState";

type AppContextProviderProps = Readonly<{
  children: ReactNode;
}>;

function detectSystemColorMode(): ColorMode {
  if (typeof globalThis.matchMedia !== "function") {
    return "light";
  }

  return globalThis.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function AppContextProvider(props: AppContextProviderProps) {
  const location = useLocation();
  const schema = useSchema();
  const { t } = useTranslation();

  const [colorMode, updateColorMode] = useLocalStorage<ColorMode>("color_mode", detectSystemColorMode());
  const [showSnackbar, updateShowSnackbar] = useLocalStorage<boolean>("show_snackbar", isLocalStorageAvailable());

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
            paper: colorMode === "light" ? "#f9fafb" : "#1f252d",
          },
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontSize: "2rem",
            lineHeight: 1.25,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          },
          h2: {
            fontSize: "1.25rem",
            lineHeight: 1.35,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          },
          body1: {
            fontSize: "1rem",
            lineHeight: 1.625,
            fontWeight: 400,
          },
          body2: {
            fontSize: "0.9375rem",
            lineHeight: 1.55,
            fontWeight: 400,
          },
          caption: {
            fontSize: "0.8125rem",
            lineHeight: 1.38,
            fontWeight: 500,
          },
          overline: {
            fontSize: "0.72rem",
            lineHeight: 1.3,
            letterSpacing: "0.08em",
            fontWeight: 600,
          },
        },
        components: {
          MuiButtonBase: {
            styleOverrides: {
              root: {
                "&.Mui-focusVisible": {
                  outline: "2px solid",
                  outlineColor: colorMode === "light" ? teal[700] : teal[400],
                  outlineOffset: 2,
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: colorMode === "light" ? "0 1px 2px rgba(15, 23, 42, 0.08)" : "0 1px 2px rgba(0, 0, 0, 0.4)",
              },
            },
          },
        },
      }),
    [colorMode],
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
    document.title = `${pageName} | ${fullName}`;
  }, [location.pathname, schema.personal, t]);

  const themeModeContextValue = useMemo(
    () => ({
      colorMode,
      updateColorMode,
    }),
    [colorMode, updateColorMode],
  );

  const uiStateContextValue = useMemo(
    () => ({
      openState,
      openStateDispatch,
    }),
    [openState, openStateDispatch],
  );

  return (
    <SchemaContext.Provider value={schema}>
      <ThemeModeContext.Provider value={themeModeContextValue}>
        <UiStateContext.Provider value={uiStateContextValue}>
          <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </UiStateContext.Provider>
      </ThemeModeContext.Provider>
    </SchemaContext.Provider>
  );
}
