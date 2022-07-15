import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useAppDispatch } from "../../context/AppContextDispatch";
import { OpenStateActions } from "../../context/OpenState";

export function CookieSnackbar() {
  const app = useApp();
  const appDispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Snackbar
      key="snackbar-cookies"
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={app.openState.snackbar}
      onClose={() => appDispatch.openStateDispatch({ type: OpenStateActions.SNACKBAR_CLOSE })}
      message={t("common:messages.storedCookies")}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => appDispatch.openStateDispatch({ type: OpenStateActions.SNACKBAR_CLOSE })}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}
