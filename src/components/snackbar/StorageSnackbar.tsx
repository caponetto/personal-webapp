import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useTranslation } from "react-i18next";

type StorageSnackbarProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export function StorageSnackbar(props: StorageSnackbarProps) {
  const { t } = useTranslation();

  return (
    <Snackbar
      key="snackbar-storage"
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={props.isOpen}
      onClose={props.onClose}
      message={t("common:messages.storedPreferences")}
      action={
        <IconButton size="small" aria-label={t("common:ui.close")} color="inherit" onClick={props.onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}
