import Cookies, { CookieAttributes } from "js-cookie";
import { useCallback, useMemo, useState } from "react";

export type CookieNames = "color_mode" | "show_snackbar";

export function useCookie<T>(name: CookieNames, defaultValue: T, options?: CookieAttributes): [T, (v: T) => void] {
  const defaultOptions = useMemo<CookieAttributes>(
    () => ({
      expires: 100, // days
      path: "/",
      sameSite: "strict",
    }),
    [],
  );

  const [value, setValue] = useState(() => {
    try {
      const cookie = Cookies.get(name);
      if (cookie) {
        return JSON.parse(cookie) as T;
      }
    } catch (e) {
      console.error(`Cannot parse cookie "${name}"; using default value "${defaultValue}" instead`);
    }
    Cookies.set(name, JSON.stringify(defaultValue), options || defaultOptions);
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue: T) => {
      Cookies.set(name, JSON.stringify(newValue), options ?? defaultOptions);
      setValue(newValue);
    },
    [defaultOptions, name, options],
  );

  return [value, updateCookie];
}
