import CodeIcon from "@mui/icons-material/Code";
import ForumIcon from "@mui/icons-material/Forum";
import InfoIcon from "@mui/icons-material/Info";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TimelineIcon from "@mui/icons-material/Timeline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useMemo } from "react";
import { useHistory } from "react-router";
import { routes } from "../common/Routes";
import { DrawerListItem } from "../components/DrawerListItem";
import { FaceBadge } from "../components/FaceBadge";
import { SocialBar } from "../components/SocialBar";
import { DRAWER_WIDTH, useApp } from "../context/AppContext";

export function AppDrawer() {
  const app = useApp();
  const history = useHistory();
  const denseList = useMediaQuery("(min-height:580px) and (max-height:630px)");

  const items = useMemo(
    () => (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", minHeight: "100%" }}>
        <FaceBadge
          name={app.data.fullName}
          avatarRoute={routes.images.avatar}
          location={{
            name: app.data.location.country,
            emojiIcon: app.data.location.flag,
            url: app.data.location.url,
          }}
          onClick={() => app.goTo(routes.nav.about)}
        />
        <List dense={denseList} sx={{ flexGrow: 1 }}>
          <DrawerListItem
            title={"About"}
            subtitle={"Words about myself"}
            icon={<InfoIcon />}
            onClick={() => app.goTo(routes.nav.about)}
            selected={history.location.pathname === routes.nav.about}
          />
          <DrawerListItem
            title={"Journey"}
            subtitle={"Education & Experience"}
            icon={<TimelineIcon />}
            onClick={() => app.goTo(routes.nav.journey)}
            selected={history.location.pathname === routes.nav.journey}
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
          <SocialBar sx={{ width: "60%", mx: "auto", mb: "10px" }} />
          <Typography variant="caption" component="div" align="center">
            {`© ${new Date().getFullYear()} ${app.data.fullName}`}
          </Typography>
        </Box>
      </Box>
    ),
    [app, history.location.pathname, denseList]
  );

  const muiPaperStyle = useMemo(
    () => ({
      "& .MuiDrawer-paper": { overflow: "overlay", boxShadow: 2, boxSizing: "border-box", width: DRAWER_WIDTH },
    }),
    []
  );

  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, height: "100%", flexShrink: { md: 0 } }}>
      <Drawer
        id="temporary-drawer"
        variant="temporary"
        open={app.drawerOpen}
        ModalProps={{
          keepMounted: true,
          onBackdropClick: () => app.setDrawerOpen(false),
        }}
        sx={{
          display: { xs: "block", md: "none" },
          ...muiPaperStyle,
        }}
      >
        {items}
      </Drawer>
      <Drawer
        id="permanent-drawer"
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          ...muiPaperStyle,
        }}
        open
      >
        {items}
      </Drawer>
    </Box>
  );
}
