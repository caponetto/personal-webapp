import { ChipProps } from "@mui/material";
import Chip from "@mui/material/Chip";
import { SxProps, Theme } from "@mui/material/styles";

export function StaticChip(props: ChipProps) {
  const baseSx = {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: `${props.color}.main`,
    ...(props.variant === "filled" && {
      color: "common.white",
      "& .MuiChip-label": {
        color: "common.white",
      },
    }),
    ...(props.variant !== "filled" && {
      color: "text.secondary",
      opacity: 0.86,
      "&:hover": {
        backgroundColor: "rgba(0, 128, 96, 0.06)",
        opacity: 1,
        color: "text.primary",
      },
    }),
    "&:focus-visible": {
      outline: "2px solid",
      outlineColor: `${props.color}.main`,
      outlineOffset: 2,
    },
  };

  const mergedSx = [baseSx, props.sx] as SxProps<Theme>;

  return <Chip {...props} sx={mergedSx} />;
}
