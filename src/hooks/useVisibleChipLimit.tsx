import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

type VisibleChipLimits = Readonly<{
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}>;

const DEFAULT_VISIBLE_CHIP_LIMITS: VisibleChipLimits = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
};

type VisibleChipLimit = Readonly<{
  isSmallScreen: boolean;
  visibleLimit: number;
}>;

export function useVisibleChipLimit(limits: VisibleChipLimits = DEFAULT_VISIBLE_CHIP_LIMITS): VisibleChipLimit {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const isUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const isUpLg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const isUpXl = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));

  if (isSmallScreen) {
    return { isSmallScreen, visibleLimit: limits.xs };
  }
  if (isUpXl) {
    return { isSmallScreen, visibleLimit: limits.xl };
  }
  if (isUpLg) {
    return { isSmallScreen, visibleLimit: limits.lg };
  }
  if (isUpMd) {
    return { isSmallScreen, visibleLimit: limits.md };
  }
  return { isSmallScreen, visibleLimit: limits.sm };
}
