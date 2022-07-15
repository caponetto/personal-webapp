import List from "@mui/material/List";
import { JourneyItem, JourneyKind } from "../../schema";
import { JourneyListItem } from "./JourneyListItem";

interface JourneyListProps {
  kind: JourneyKind;
  items: JourneyItem[];
}

export function JourneyList(props: JourneyListProps) {
  return (
    <List dense={true}>
      {props.items.map((item: JourneyItem, idx: number) => (
        <JourneyListItem key={`${props.kind}-item-${idx}`} item={item} />
      ))}
    </List>
  );
}
