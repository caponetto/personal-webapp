import { ChipProps } from "@mui/material";
import Chip from "@mui/material/Chip";

export function HoverableChip(props: ChipProps) {
  return (
    <Chip
      {...props}
      sx={{
        "&:hover": { transform: "scale(1.03)" },
        borderStyle: "solid",
        borderColor: props.color,
      }}
    />
  );
}
