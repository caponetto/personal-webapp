import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { OpenStateActions } from "../../context/OpenState";
import { DrawerContent } from "./DrawerContent";

interface AppDrawerProps {
  drawerWidth: number;
  drawerItemWidth: number;
}

export function AppDrawer(props: AppDrawerProps) {
  const app = useApp();

  const drawerContent = useMemo(
    () => <DrawerContent drawerItemWidth={props.drawerItemWidth} />,
    [props.drawerItemWidth]
  );

  const muiPaperStyle = useMemo(
    () => ({
      "& .MuiDrawer-paper": { overflow: "overlay", boxShadow: 2, boxSizing: "border-box", width: props.drawerWidth },
    }),
    [props.drawerWidth]
  );

  return (
    <Box component="nav" sx={{ width: { md: props.drawerWidth }, height: "100%", flexShrink: { md: 0 } }}>
      <SwipeableDrawer
        data-testid="temporary-drawer"
        disableSwipeToOpen
        variant="temporary"
        open={app.openState.drawer}
        onOpen={() => app.openStateDispatch({ type: OpenStateActions.DRAWER_OPEN })}
        onClose={() => app.openStateDispatch({ type: OpenStateActions.DRAWER_CLOSE })}
        ModalProps={{
          keepMounted: true,
          onBackdropClick: () => app.openStateDispatch({ type: OpenStateActions.DRAWER_CLOSE }),
        }}
        sx={{
          display: { xs: "block", md: "none" },
          ...muiPaperStyle,
        }}
      >
        {drawerContent}
      </SwipeableDrawer>
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
    </Box>
  );
}
