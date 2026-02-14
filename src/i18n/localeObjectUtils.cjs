function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function joinPath(prefix, key) {
  return prefix ? `${prefix}.${key}` : key;
}

function collectLeafPathsFromArray(prefix) {
  return prefix ? [prefix] : [];
}

function collectLeafPathsFromObject(value, prefix) {
  return Object.keys(value).flatMap((key) => collectLeafPaths(value[key], joinPath(prefix, key)));
}

function collectLeafPaths(value, prefix = "") {
  if (Array.isArray(value)) {
    return collectLeafPathsFromArray(prefix);
  }

  if (isObject(value)) {
    return collectLeafPathsFromObject(value, prefix);
  }

  return prefix ? [prefix] : [];
}

function collectUnsortedPathsFromArray(value, currentPath) {
  return value.flatMap((child, index) => collectUnsortedObjectPaths(child, `${currentPath}[${index}]`));
}

function hasUnsortedKeys(keys) {
  const sortedKeys = [...keys].sort((a, b) => a.localeCompare(b));
  return !keys.every((key, index) => key === sortedKeys[index]);
}

function collectUnsortedPathsFromObject(value, currentPath) {
  const keys = Object.keys(value);
  const issues = [];

  if (hasUnsortedKeys(keys)) {
    issues.push(currentPath);
  }

  keys.forEach((key) => {
    const childPath = currentPath === "<root>" ? key : `${currentPath}.${key}`;
    issues.push(...collectUnsortedObjectPaths(value[key], childPath));
  });

  return issues;
}

function collectUnsortedObjectPaths(value, currentPath = "<root>") {
  if (Array.isArray(value)) {
    return collectUnsortedPathsFromArray(value, currentPath);
  }

  if (!isObject(value)) {
    return [];
  }

  return collectUnsortedPathsFromObject(value, currentPath);
}

function buildKindsResult(prefix, kind) {
  return prefix ? { [prefix]: kind } : {};
}

function collectKindsFromObject(value, prefix) {
  const result = buildKindsResult(prefix, "object");
  Object.keys(value).forEach((objectKey) => {
    const childPrefix = joinPath(prefix, objectKey);
    Object.assign(result, collectValueKinds(value[objectKey], childPrefix));
  });
  return result;
}

function collectValueKinds(value, prefix = "") {
  if (Array.isArray(value)) {
    return buildKindsResult(prefix, "array");
  }

  if (value === null) {
    return buildKindsResult(prefix, "null");
  }

  if (isObject(value)) {
    return collectKindsFromObject(value, prefix);
  }

  return buildKindsResult(prefix, typeof value);
}

module.exports = {
  collectLeafPaths,
  collectUnsortedObjectPaths,
  collectValueKinds,
};
