import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Tooltip } from "@mui/material";
import Fab from "@mui/material/Fab";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

type ScrollTopProps = Readonly<{
  anchor: string;
  canShow: boolean;
}>;

export function ScrollTop(props: ScrollTopProps) {
  const { t } = useTranslation();
  const scrollTrigger = useScrollTrigger();
  const scrollToTopLabel = t("literal:scrollToTop").toString();

  const scrollToAnchor = (event: MouseEvent<HTMLButtonElement>) => {
    const anchor = (event.currentTarget.ownerDocument || document).querySelector(`#${props.anchor}`);

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
          <Tooltip title={scrollToTopLabel} arrow>
            <Fab
              color="success"
              size="small"
              aria-label={scrollToTopLabel}
              onClick={scrollToAnchor}
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                boxShadow: 4,
                "&:hover": {
                  backgroundColor: "success.dark",
                },
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Tooltip>
        </Zoom>
      )}
    </>
  );
}
