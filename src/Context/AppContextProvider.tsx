import { blueGrey, grey, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { cookieNames, getCookie, setCookie } from "../Common/Cookies";
import { AppContext, ColorMode } from "./AppContext";

interface ContextProps {
  children: ReactNode;
}

export function AppContextProvider(props: ContextProps) {
  const location = useLocation();
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>(
    (getCookie(cookieNames.colorMode) as ColorMode) === "dark" ? "dark" : "light"
  );

  const isLight = useMemo(() => colorMode === "light", [colorMode]);

  const toggleColorMode = useCallback(() => {
    setColorMode((previous: ColorMode) => (previous === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: blueGrey[500],
          },
          success: {
            main: isLight ? teal[700] : grey[500],
          },
          info: {
            main: isLight ? grey[700] : grey[600],
          },
          mode: colorMode,
        },
      }),
    [colorMode, isLight]
  );

  const goTo = useCallback(
    (route: string) => {
      setDrawerOpen(false);
      if (location.pathname === route) {
        return;
      }
      history.push(route);
    },
    [history, location.pathname]
  );

  useEffect(() => {
    setCookie(cookieNames.colorMode, colorMode);
  }, [colorMode]);

  return (
    <AppContext.Provider value={{ isLight, drawerOpen, setDrawerOpen, toggleColorMode, goTo }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppContext.Provider>
  );
}
