import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EXTERNAL_LINK_PROPS } from "../../utils/externalLink";
import { JourneyItem, JourneyKind } from "../../schema";
import { ExperienceTitle } from "./ExperienceTitle";

type JourneyListItemProps = Readonly<{
  item: JourneyItem;
  kind: JourneyKind;
}>;

export function JourneyListItem(props: JourneyListItemProps) {
  const isExperienceItem = props.kind === "experience";

  return (
    <ListItem
      sx={{
        px: 0,
        py: 1.15,
        alignItems: "flex-start",
        "&:not(:last-of-type)": {
          borderBottom: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <ListItemText
        sx={{ my: 0 }}
        primary={isExperienceItem ? <ExperienceTitle title={props.item.title} /> : props.item.title}
        slotProps={{
          primary: isExperienceItem
            ? undefined
            : { sx: { fontWeight: 500, fontSize: { xs: "0.97rem", md: "1.02rem" }, lineHeight: 1.4 } },
          secondary: {
            sx: {
              color: "text.secondary",
            },
          },
        }}
        secondary={
          <Stack
            component="span"
            direction="row"
            spacing={0.5}
            sx={{ mt: 0.45, alignItems: "center", flexWrap: "wrap", rowGap: 0.25 }}
          >
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              {String(props.item.period.start)}
            </Typography>
            {props.item.period.end && (
              <Typography
                variant="overline"
                sx={{ color: "text.secondary" }}
              >{`→ ${props.item.period.end}`}</Typography>
            )}
            <Typography variant="overline" sx={{ fontSize: "10px", lineHeight: "100%", color: "text.secondary" }}>
              {"@"}
            </Typography>
            <Link
              color="primary"
              underline="hover"
              variant="overline"
              href={props.item.location.url}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.45,
                "&:hover": {
                  textDecorationThickness: "2px",
                },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                  borderRadius: 0.4,
                  textDecoration: "underline",
                },
              }}
              {...EXTERNAL_LINK_PROPS}
            >
              {props.item.location.name}
            </Link>
          </Stack>
        }
      />
    </ListItem>
  );
}
