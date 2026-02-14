import { useCallback, useState } from "react";

export type LocalStorageKeys = "color_mode" | "show_snackbar";

function canUseLocalStorage() {
  try {
    if (globalThis.localStorage === undefined) {
      return false;
    }
    const testKey = "__local_storage_test__";
    globalThis.localStorage.setItem(testKey, "1");
    globalThis.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function useLocalStorage<T>(key: LocalStorageKeys, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (!canUseLocalStorage()) {
      return defaultValue;
    }

    try {
      const storedValue = globalThis.localStorage.getItem(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue) as T;
      }
    } catch {
      console.error(`Cannot parse localStorage key "${key}"; using default value instead`);
    }

    try {
      globalThis.localStorage.setItem(key, JSON.stringify(defaultValue));
    } catch {
      return defaultValue;
    }

    return defaultValue;
  });

  const updateValue = useCallback(
    (newValue: T) => {
      try {
        if (canUseLocalStorage()) {
          globalThis.localStorage.setItem(key, JSON.stringify(newValue));
        }
      } catch {
        // Ignore storage quota/access errors and keep UI state in sync.
      }

      setValue(newValue);
    },
    [key],
  );

  return [value, updateValue];
}

export function isLocalStorageAvailable() {
  return canUseLocalStorage();
}
