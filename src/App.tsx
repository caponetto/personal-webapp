import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import { ReactNode, Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import { HashRouter } from "react-router-dom";
import { AppBar } from "./components/appbar";
import { AppDrawer } from "./components/drawer";
import { ScrollTop } from "./components/scrolltop";
import { StorageSnackbar } from "./components/snackbar";
import { AppContextProvider } from "./context/AppContextProvider";
import { useThemeModeContext, useUiStateContext } from "./context/AppContext";
import { OpenStateActions } from "./context/OpenState";
import "./fonts";
import i18n from "./i18n";
import { RouteSwitch } from "./pages";

const BACK_TO_TOP_ANCHOR = "back-to-top-anchor";
const DRAWER_WIDTH = 300;
const DRAWER_ITEM_WIDTH = DRAWER_WIDTH - 16;

export function App() {
  return (
    <AppProviders>
      <AppShell />
    </AppProviders>
  );
}

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

function AppProviders(props: AppProvidersProps) {
  return (
    <HashRouter>
      <I18nextProvider i18n={i18n}>
        <Suspense
          fallback={
            <LinearProgress
              color="inherit"
              sx={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 2000 }}
            />
          }
        >
          <AppContextProvider>{props.children}</AppContextProvider>
        </Suspense>
      </I18nextProvider>
    </HashRouter>
  );
}

function AppShell() {
  const { colorMode } = useThemeModeContext();
  const { openState, openStateDispatch } = useUiStateContext();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
        backgroundImage:
          colorMode === "light"
            ? "radial-gradient(1200px 560px at 100% -10%, rgba(148, 163, 184, 0.12), transparent 60%)"
            : "radial-gradient(1000px 500px at 100% -10%, rgba(94, 234, 212, 0.1), transparent 60%)",
      }}
    >
      <CssBaseline />
      <AppBar drawerWidth={DRAWER_WIDTH} />
      <AppDrawer drawerWidth={DRAWER_WIDTH} drawerItemWidth={DRAWER_ITEM_WIDTH} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar id={BACK_TO_TOP_ANCHOR} sx={{ minHeight: { xs: 52, sm: 56 } }} />
        <Suspense fallback={<LinearProgress sx={{ height: "2px" }} />}>
          <RouteSwitch />
        </Suspense>
      </Box>
      <StorageSnackbar
        isOpen={openState.snackbar}
        onClose={() => openStateDispatch({ type: OpenStateActions.SNACKBAR_CLOSE })}
      />
      <ScrollTop canShow={!openState.snackbar} anchor={BACK_TO_TOP_ANCHOR} />
    </Box>
  );
}
