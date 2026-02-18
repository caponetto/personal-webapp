import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import { useUiStateContext } from "../../context/AppContext";
import { OpenStateActions } from "../../context/OpenState";
import { DrawerContent } from "./DrawerContent";

type AppDrawerProps = Readonly<{
  drawerWidth: number;
  drawerItemWidth: number;
}>;

export function AppDrawer(props: AppDrawerProps) {
  const { openState, openStateDispatch } = useUiStateContext();
  const isDesktop = useMediaQuery("(min-width:900px)");

  const drawerContent = useMemo(
    () => <DrawerContent drawerItemWidth={props.drawerItemWidth} />,
    [props.drawerItemWidth],
  );

  const muiPaperStyle = useMemo(
    () => ({
      "& .MuiDrawer-paper": {
        overflowY: "auto",
        overflowX: "hidden",
        boxShadow: 2,
        boxSizing: "border-box",
        width: props.drawerWidth,
      },
    }),
    [props.drawerWidth],
  );

  return (
    <Box component="nav" sx={{ width: { md: props.drawerWidth }, height: "100%", flexShrink: { md: 0 } }}>
      {isDesktop ? (
        <Drawer
          data-testid="permanent-drawer"
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            ...muiPaperStyle,
          }}
          open
        >
          {drawerContent}
        </Drawer>
      ) : (
        <SwipeableDrawer
          data-testid="temporary-drawer"
          disableSwipeToOpen
          variant="temporary"
          open={openState.drawer}
          onOpen={() => openStateDispatch({ type: OpenStateActions.DRAWER_OPEN })}
          onClose={() => openStateDispatch({ type: OpenStateActions.DRAWER_CLOSE })}
          ModalProps={{
            keepMounted: false,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            ...muiPaperStyle,
          }}
        >
          {drawerContent}
        </SwipeableDrawer>
      )}
    </Box>
  );
}
