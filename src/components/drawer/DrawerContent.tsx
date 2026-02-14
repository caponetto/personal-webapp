import ArticleIcon from "@mui/icons-material/Article";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CodeIcon from "@mui/icons-material/Code";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { DrawerListItem } from "./DrawerListItem";
import { useSchemaContext } from "../../context/AppContext";
import { routes } from "../../routes";
import { FaceBadge } from "../badge";
import { Copyright } from "../copyright";
import { SocialBar } from "../social";

type DrawerContentProps = Readonly<{
  drawerItemWidth: number;
}>;

export function DrawerContent(props: DrawerContentProps) {
  const { personal } = useSchemaContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const denseList = useMediaQuery("(min-height:580px) and (max-height:600px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

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
        <Fade in={true} timeout={reduceMotion ? 0 : 110}>
          <div>
            <DrawerListItem
              testId="nav-item-about"
              width={props.drawerItemWidth}
              title={t("literal:about")}
              subtitle={t("drawer:about.subtitle")}
              icon={{ initial: <PersonOutlineIcon />, selected: <PersonIcon /> }}
              onClick={() => navigate(routes.nav.about)}
              selected={location.pathname === routes.nav.about}
            />
          </div>
        </Fade>
        <Fade in={true} timeout={reduceMotion ? 0 : 140}>
          <div>
            <DrawerListItem
              testId="nav-item-journey"
              width={props.drawerItemWidth}
              title={t("literal:journey")}
              subtitle={t("drawer:journey.subtitle")}
              icon={{ initial: <TimelineOutlinedIcon />, selected: <TimelineIcon /> }}
              onClick={() => navigate(routes.nav.journey)}
              selected={location.pathname === routes.nav.journey}
            />
          </div>
        </Fade>
        <Fade in={true} timeout={reduceMotion ? 0 : 170}>
          <div>
            <DrawerListItem
              testId="nav-item-text"
              width={props.drawerItemWidth}
              title={t("literal:text")}
              subtitle={t("drawer:text.subtitle")}
              icon={{ initial: <ArticleOutlinedIcon />, selected: <ArticleIcon /> }}
              onClick={() => navigate(routes.nav.text)}
              selected={location.pathname === routes.nav.text}
            />
          </div>
        </Fade>
        <Fade in={true} timeout={reduceMotion ? 0 : 200}>
          <div>
            <DrawerListItem
              testId="nav-item-talk"
              width={props.drawerItemWidth}
              title={t("literal:talk")}
              subtitle={t("drawer:talk.subtitle")}
              icon={{ initial: <RecordVoiceOverOutlinedIcon />, selected: <RecordVoiceOverIcon /> }}
              onClick={() => navigate(routes.nav.talk)}
              selected={location.pathname === routes.nav.talk}
            />
          </div>
        </Fade>
        <Fade in={true} timeout={reduceMotion ? 0 : 230}>
          <div>
            <DrawerListItem
              testId="nav-item-code"
              width={props.drawerItemWidth}
              title={t("literal:code")}
              subtitle={t("drawer:code.subtitle")}
              icon={{ initial: <CodeOutlinedIcon />, selected: <CodeIcon /> }}
              onClick={() => navigate(routes.nav.code)}
              selected={location.pathname === routes.nav.code}
            />
          </div>
        </Fade>
      </List>
      <Box sx={{ width: 1, flexShrink: 0 }}>
        <SocialBar sx={{ width: "60%", mx: "auto", mb: "10px" }} urls={personal.urls} />
        <Copyright name={`${personal.firstName} ${personal.lastName}`} />
      </Box>
    </Box>
  );
}
