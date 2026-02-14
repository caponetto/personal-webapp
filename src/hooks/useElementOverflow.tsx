import { useCallback, useEffect, useRef, useState } from "react";

export function useElementOverflow<T extends HTMLElement>(dependencyKey?: string) {
  const elementRef = useRef<T | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const updateOverflow = useCallback(() => {
    const element = elementRef.current;
    if (!element) {
      setIsOverflowing(false);
      return;
    }

    setIsOverflowing(element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1);
  }, []);

  useEffect(() => {
    const frameId = globalThis.requestAnimationFrame(updateOverflow);

    if (globalThis.ResizeObserver !== undefined) {
      const observer = new globalThis.ResizeObserver(updateOverflow);
      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => {
        globalThis.cancelAnimationFrame(frameId);
        observer.disconnect();
      };
    }

    globalThis.window?.addEventListener("resize", updateOverflow);
    return () => {
      globalThis.cancelAnimationFrame(frameId);
      globalThis.window?.removeEventListener("resize", updateOverflow);
    };
  }, [updateOverflow, dependencyKey]);

  return { elementRef, isOverflowing };
}
