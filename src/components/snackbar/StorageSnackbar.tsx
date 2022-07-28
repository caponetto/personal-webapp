import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useTranslation } from "react-i18next";

interface StorageSnackbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StorageSnackbar(props: StorageSnackbarProps) {
  const { t } = useTranslation();

  return (
    <Snackbar
      key="snackbar-cookies"
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={props.isOpen}
      onClose={props.onClose}
      message={t("common:messages.storedCookies")}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={props.onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}
