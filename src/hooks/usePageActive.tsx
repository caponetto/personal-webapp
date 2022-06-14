import { useState } from "react";
import { useTimeout } from "./useTimeout";

export function usePageActive(delay: number) {
  const [active, setActive] = useState(false);
  useTimeout(() => setActive(true), delay);
  return active;
}
