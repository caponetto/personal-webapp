import List from "@mui/material/List";
import { JourneyItem, JourneyKind } from "../../schema";
import { JourneyListItem } from "./JourneyListItem";

type JourneyListProps = Readonly<{
  kind: JourneyKind;
  items: JourneyItem[];
}>;

export function JourneyList(props: JourneyListProps) {
  return (
    <List dense={true}>
      {props.items.map((item: JourneyItem) => (
        <JourneyListItem key={item.id} item={item} kind={props.kind} />
      ))}
    </List>
  );
}
