import CodeIcon from "@mui/icons-material/Code";
import ForumIcon from "@mui/icons-material/Forum";
import InfoIcon from "@mui/icons-material/Info";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import { useHistory } from "react-router";
import { routes } from "./Common/Routes";
import { DrawerListItem } from "./Components/DrawerListItem";
import { FaceBadge } from "./Components/FaceBadge";
import { SocialBar } from "./Components/SocialBar";
import { COPYRIGHT, DRAWER_WIDTH, FULL_NAME, useApp } from "./Context/AppContext";

export function AppDrawer() {
  const app = useApp();
  const history = useHistory();

  const items = useMemo(
    () => (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", minHeight: "100%" }}>
        <FaceBadge
          name={FULL_NAME}
          avatarRoute={routes.images.avatar}
          location={{ name: "Brazil", emojiIcon: "🇧🇷", url: routes.urls.mapsCountry }}
          onClick={() => app.goTo(routes.nav.about)}
        />
        <List sx={{ flexGrow: 1 }}>
          <DrawerListItem
            title={"About"}
            subtitle={"Words about myself"}
            icon={<InfoIcon />}
            onClick={() => app.goTo(routes.nav.about)}
            selected={[routes.nav.root, routes.nav.about].includes(history.location.pathname)}
          />
          <DrawerListItem
            title={"Text"}
            subtitle={"Content that I've written"}
            icon={<TextSnippetIcon />}
            onClick={() => app.goTo(routes.nav.text)}
            selected={history.location.pathname === routes.nav.text}
          />
          <DrawerListItem
            title={"Talk"}
            subtitle={"Things that I've talked about"}
            icon={<ForumIcon />}
            onClick={() => app.goTo(routes.nav.talk)}
            selected={history.location.pathname === routes.nav.talk}
          />
          <DrawerListItem
            title={"Code"}
            subtitle={"Lines worth highlighting"}
            icon={<CodeIcon />}
            onClick={() => app.goTo(routes.nav.code)}
            selected={history.location.pathname === routes.nav.code}
          />
        </List>
        <Box sx={{ width: 1, flexShrink: 0 }}>
          <SocialBar />
          <Typography variant="caption" component="div" align="center">
            {COPYRIGHT}
          </Typography>
        </Box>
      </Box>
    ),
    [app, history]
  );

  return (
    <Box component="nav" sx={{ boxShadow: 2, width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={app.drawerOpen}
        ModalProps={{
          keepMounted: true,
          onBackdropClick: () => app.setDrawerOpen(false),
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
        }}
      >
        {items}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
        }}
        open
      >
        {items}
      </Drawer>
    </Box>
  );
}
