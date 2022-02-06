import { blueGrey, grey, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { cookieNames, getCookie, setCookie } from "../common/Cookies";
import { PERSONAL_DATA } from "../common/Data";
import { routes } from "../common/Routes";
import { AppContext, ColorMode } from "./AppContext";

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider(props: AppContextProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>(
    (getCookie(cookieNames.colorMode) as ColorMode) === "dark" ? "dark" : "light"
  );

  const data = useMemo(() => PERSONAL_DATA, []);

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
    document.title = `${data.fullName} | ${routeName}`;
  }, [data.fullName, location.pathname]);

  return (
    <AppContext.Provider value={{ data, isLight, drawerOpen, setDrawerOpen, toggleColorMode, goTo }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppContext.Provider>
  );
}
