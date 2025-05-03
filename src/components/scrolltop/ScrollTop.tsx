import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface ScrollTopProps {
  anchor: string;
  canShow: boolean;
}

export function ScrollTop(props: ScrollTopProps) {
  const { t } = useTranslation();
  const scrollTrigger = useScrollTrigger();

  const scrollToAnchor = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(`#${props.anchor}`);

    if (!anchor) {
      return;
    }

    anchor.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <>
      {props.canShow && (
        <Zoom in={scrollTrigger}>
          <Box onClick={scrollToAnchor} role="presentation" sx={{ position: "fixed", bottom: 16, right: 16 }}>
            <Tooltip title={t("literal:scrollToTop")} arrow>
              <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab>
            </Tooltip>
          </Box>
        </Zoom>
      )}
    </>
  );
}
