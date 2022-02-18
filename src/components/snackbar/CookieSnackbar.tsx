import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import React, { useCallback, useMemo, useState } from "react";
import { cookieNames, getCookie, setCookie } from "../../cookies";

export function CookieSnackbar() {
  const showSnackbarCookie = useMemo(() => getCookie(cookieNames.showSnackbar), []);
  const [open, setOpen] = useState(
    navigator.cookieEnabled && (showSnackbarCookie === undefined || showSnackbarCookie === "true")
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setCookie(cookieNames.showSnackbar, "false");
  }, []);

  return (
    <Snackbar
      key="snackbar-cookies"
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={open}
      onClose={handleClose}
      message="Your preferences are stored in cookies. :)"
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}
