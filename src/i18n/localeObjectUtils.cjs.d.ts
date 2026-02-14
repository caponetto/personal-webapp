declare const localeObjectUtils: {
  collectLeafPaths(value: unknown, prefix?: string): string[];
  collectUnsortedObjectPaths(value: unknown, currentPath?: string): string[];
  collectValueKinds(value: unknown, prefix?: string): Record<string, string>;
};

export = localeObjectUtils;
