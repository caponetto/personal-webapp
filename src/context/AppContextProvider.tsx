import { blueGrey, grey, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { DARK_GRAY, WHITE_GRAY } from "../colors";
import { cookieNames, getCookie, setCookie } from "../cookies";
import { ABOUT_DATA } from "../data/AboutData";
import { CODE_DATA } from "../data/CodeData";
import { JOURNEY_DATA } from "../data/JourneyData";
import { PERSONAL_DATA } from "../data/PersonalData";
import { TALK_DATA } from "../data/TalkData";
import { TEXT_DATA } from "../data/TextData";
import { routes } from "../routes";
import { AppContext, ColorMode } from "./AppContext";

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider(props: AppContextProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>(
    (getCookie(cookieNames.colorMode) as ColorMode) === "dark" ? "dark" : "light"
  );

  const data = useMemo(
    () => ({
      personal: PERSONAL_DATA,
      about: ABOUT_DATA,
      journey: JOURNEY_DATA,
      text: TEXT_DATA,
      talk: TALK_DATA,
      code: CODE_DATA,
    }),
    []
  );

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
      setDrawerOpen(false);
      if (location.pathname === route) {
        return;
      }
      navigate(route);
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    setCookie(cookieNames.colorMode, colorMode);
  }, [colorMode]);

  useEffect(() => {
    const relativePath = location.pathname.slice(1);
    if (relativePath === "" || !Object.values(routes.nav).includes(location.pathname)) {
      return;
    }

    const routeName = relativePath.charAt(0).toUpperCase() + relativePath.slice(1);
    document.title = `${data.personal.fullName} | ${routeName}`;
  }, [data.personal.fullName, location.pathname]);

  const contextValue = useMemo(
    () => ({
      data,
      colorMode,
      setColorMode,
      drawerOpen,
      setDrawerOpen,
      settingsOpen,
      setSettingsOpen,
      goTo,
    }),
    [data, colorMode, drawerOpen, settingsOpen, goTo]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppContext.Provider>
  );
}
