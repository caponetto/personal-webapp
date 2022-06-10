import { useState } from "react";
import { useTimeout } from "./useTimeout";

export function usePageActive() {
  const [active, setActive] = useState(false);
  useTimeout(() => setActive(true), 0);
  return active;
}
