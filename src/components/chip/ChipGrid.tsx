import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

interface ChipGridProps {
  groupName: string;
  items: string[];
}

export function ChipGrid(props: ChipGridProps) {
  return (
    <Grid container spacing={1}>
      {[...props.items]
        .sort((a, b) => a.localeCompare(b))
        .map((item: string) => (
          <Grid item key={`${props.groupName}-${item}`}>
            <Chip label={item} color="default" variant="outlined" size="small" sx={{ borderRadius: "8px" }} />
          </Grid>
        ))}
    </Grid>
  );
}
