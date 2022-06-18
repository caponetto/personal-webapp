import { ChipProps } from "@mui/material";
import Chip from "@mui/material/Chip";

export function StaticChip(props: ChipProps) {
  return <Chip {...props} sx={{ borderWidth: "1px", borderStyle: "solid", borderColor: `${props.color}.main` }} />;
}
