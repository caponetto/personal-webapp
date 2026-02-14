import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useVisibleChipLimit } from "../../hooks/useVisibleChipLimit";
import { StaticChip } from "./StaticChip";

const XS_VISIBLE_ITEMS = 14;
const SM_VISIBLE_ITEMS = 20;
const MD_VISIBLE_ITEMS = 28;
const LG_VISIBLE_ITEMS = 40;
const XL_VISIBLE_ITEMS = 56;

type ChipGridProps = Readonly<{
  groupName: string;
  items: string[];
}>;

export function ChipGrid(props: ChipGridProps) {
  const { t } = useTranslation();
  const [showAllItems, setShowAllItems] = useState(false);
  const { visibleLimit } = useVisibleChipLimit({
    xs: XS_VISIBLE_ITEMS,
    sm: SM_VISIBLE_ITEMS,
    md: MD_VISIBLE_ITEMS,
    lg: LG_VISIBLE_ITEMS,
    xl: XL_VISIBLE_ITEMS,
  });

  const sortedItems = useMemo(() => [...props.items].sort((a, b) => a.localeCompare(b)), [props.items]);
  const shouldCollapseItems = sortedItems.length > visibleLimit;
  const visibleItems = shouldCollapseItems && !showAllItems ? sortedItems.slice(0, visibleLimit) : sortedItems;

  return (
    <Grid container spacing={1}>
      {visibleItems.map((item: string) => (
        <Grid key={`${props.groupName}-${item}`}>
          <StaticChip label={item} color="default" variant="outlined" size="small" sx={{ borderRadius: "8px" }} />
        </Grid>
      ))}
      {shouldCollapseItems && (
        <Grid size={12}>
          <Button size="small" color="success" onClick={() => setShowAllItems((prevState) => !prevState)}>
            {showAllItems ? t("journey:toolboxShowLess") : t("journey:toolboxShowMore")}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
