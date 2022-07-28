import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { ExternalLink } from "../../components/link";
import { JourneyItem } from "../../schema";

interface JourneyListItemProps {
  item: JourneyItem;
}

export function JourneyListItem(props: JourneyListItemProps) {
  return (
    <ListItem>
      <ListItemText
        primary={props.item.title}
        secondary={
          <Box component="span">
            <Typography variant="overline">{String(props.item.period.start)}</Typography>
            {props.item.period.end && (
              <Typography variant="overline" sx={{ ml: "5px" }}>{`→ ${props.item.period.end}`}</Typography>
            )}
            <Typography
              variant="overline"
              sx={{ mx: "5px", fontSize: "10px", verticalAlign: "middle", lineHeight: "100%" }}
            >
              {"@"}
            </Typography>
            <ExternalLink color="inherit" underline="hover" variant="overline" href={props.item.location.url}>
              {props.item.location.name}
            </ExternalLink>
          </Box>
        }
      />
    </ListItem>
  );
}
