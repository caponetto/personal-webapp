import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import React, { MouseEvent, useCallback } from "react";
import { useApp } from "../../context/AppContext";

interface ScrollTopProps {
  anchor: string;
}

export function ScrollTop(props: ScrollTopProps) {
  const app = useApp();
  const scrollTrigger = useScrollTrigger();

  const scrollToAnchor = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(`#${props.anchor}`);

      if (!anchor) {
        return;
      }

      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [props.anchor]
  );

  return (
    <>
      {!app.snackbarOpen && (
        <Zoom in={scrollTrigger}>
          <Box onClick={scrollToAnchor} role="presentation" sx={{ position: "fixed", bottom: 16, right: 16 }}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        </Zoom>
      )}
    </>
  );
}
