import ForumIcon from "@mui/icons-material/Forum";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SourceIcon from "@mui/icons-material/Source";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import ViewTimelineOutlinedIcon from "@mui/icons-material/ViewTimelineOutlined";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { DrawerListItem } from ".";
import { useApp } from "../../context/AppContext";
import { routes } from "../../routes";
import { FaceBadge } from "../badge";
import { Copyright } from "../copyright";
import { SocialBar } from "../social";

interface DrawerContentProps {
  drawerItemWidth: number;
}

export function DrawerContent(props: DrawerContentProps) {
  const {
    schema: { personal },
  } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const denseList = useMediaQuery("(min-height:580px) and (max-height:600px)");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", minHeight: "100%" }}>
      <FaceBadge
        name={`${personal.firstName} ${personal.lastName}`}
        imageSource={routes.static.images.avatar}
        location={{
          name: personal.country.name,
          emojiIcon: personal.country.emoji,
          url: personal.country.url,
        }}
        onClick={() => navigate(routes.nav.about)}
      />
      <List dense={denseList} sx={{ flexGrow: 1 }}>
        <DrawerListItem
          width={props.drawerItemWidth}
          title={t("literal:about")}
          subtitle={t("drawer:about.subtitle")}
          icon={{ initial: <InfoOutlinedIcon />, selected: <InfoIcon /> }}
          onClick={() => navigate(routes.nav.about)}
          selected={location.pathname === routes.nav.about}
        />
        <DrawerListItem
          width={props.drawerItemWidth}
          title={t("literal:journey")}
          subtitle={t("drawer:journey.subtitle")}
          icon={{ initial: <ViewTimelineOutlinedIcon />, selected: <ViewTimelineIcon /> }}
          onClick={() => navigate(routes.nav.journey)}
          selected={location.pathname === routes.nav.journey}
        />
        <DrawerListItem
          width={props.drawerItemWidth}
          title={t("literal:text")}
          subtitle={t("drawer:text.subtitle")}
          icon={{ initial: <TextSnippetOutlinedIcon />, selected: <TextSnippetIcon /> }}
          onClick={() => navigate(routes.nav.text)}
          selected={location.pathname === routes.nav.text}
        />
        <DrawerListItem
          width={props.drawerItemWidth}
          title={t("literal:talk")}
          subtitle={t("drawer:talk.subtitle")}
          icon={{ initial: <ForumOutlinedIcon />, selected: <ForumIcon /> }}
          onClick={() => navigate(routes.nav.talk)}
          selected={location.pathname === routes.nav.talk}
        />
        <DrawerListItem
          width={props.drawerItemWidth}
          title={t("literal:code")}
          subtitle={t("drawer:code.subtitle")}
          icon={{ initial: <SourceOutlinedIcon />, selected: <SourceIcon /> }}
          onClick={() => navigate(routes.nav.code)}
          selected={location.pathname === routes.nav.code}
        />
      </List>
      <Box sx={{ width: 1, flexShrink: 0 }}>
        <SocialBar sx={{ width: "60%", mx: "auto", mb: "10px" }} urls={personal.urls} />
        <Copyright name={`${personal.firstName} ${personal.lastName}`} />
      </Box>
    </Box>
  );
}
