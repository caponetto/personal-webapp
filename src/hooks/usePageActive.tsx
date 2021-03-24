import { useEffect, useState } from "react";

export function usePageActive() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 0);
  }, []);

  return active;
}
