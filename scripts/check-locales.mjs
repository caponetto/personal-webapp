import fs from "node:fs";
import path from "node:path";
import localeObjectUtils from "../src/i18n/localeObjectUtils.cjs";

const { collectLeafPaths, collectUnsortedObjectPaths, collectValueKinds } = localeObjectUtils;

const BASE_LOCALE = "en";
const localesRoot = path.resolve("static", "locales");

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function diffKeys(referenceKeys, targetKeys) {
  const reference = new Set(referenceKeys);
  const target = new Set(targetKeys);
  return {
    missing: [...reference].filter((key) => !target.has(key)),
    extra: [...target].filter((key) => !reference.has(key)),
  };
}

function listLocaleDirs() {
  return fs
    .readdirSync(localesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function listNamespaceFiles(localeDir) {
  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith(".json"))
    .sort();
}

function getBaseLocaleContext(localeDirs) {
  if (!localeDirs.includes(BASE_LOCALE)) {
    throw new Error(`Base locale '${BASE_LOCALE}' was not found in ${localesRoot}`);
  }

  const baseDir = path.join(localesRoot, BASE_LOCALE);
  const baseNamespaces = listNamespaceFiles(baseDir);
  return { baseDir, baseNamespaces };
}

function pushNamespaceDiffErrors(errors, locale, namespaceDiff) {
  namespaceDiff.missing.forEach((namespace) => errors.push(`[${locale}] missing namespace file: ${namespace}`));
  namespaceDiff.extra.forEach((namespace) =>
    errors.push(`[${locale}] extra namespace file not in ${BASE_LOCALE}: ${namespace}`),
  );
}

function validateNamespace(locale, namespace, baseDir, localeDir, errors) {
  const baseJson = readJsonFile(path.join(baseDir, namespace));
  const localeJson = readJsonFile(path.join(localeDir, namespace));

  const keyDiff = diffKeys(collectLeafPaths(baseJson), collectLeafPaths(localeJson));
  keyDiff.missing.forEach((missingKey) => errors.push(`[${locale}] missing key in ${namespace}: ${missingKey}`));
  keyDiff.extra.forEach((extraKey) => errors.push(`[${locale}] extra key in ${namespace}: ${extraKey}`));

  collectUnsortedObjectPaths(localeJson).forEach((objectPath) =>
    errors.push(`[${locale}] non-alphabetical keys in ${namespace} at ${objectPath}`),
  );

  const baseKinds = collectValueKinds(baseJson);
  const localeKinds = collectValueKinds(localeJson);
  const sharedPaths = Object.keys(baseKinds).filter((pathKey) => Object.hasOwn(localeKinds, pathKey));
  sharedPaths.forEach((pathKey) => {
    if (baseKinds[pathKey] !== localeKinds[pathKey]) {
      errors.push(
        `[${locale}] kind mismatch in ${namespace} at ${pathKey}: expected '${baseKinds[pathKey]}' got '${localeKinds[pathKey]}'`,
      );
    }
  });
}

function validateLocaleAgainstBase(locale, baseDir, baseNamespaces, errors) {
  const localeDir = path.join(localesRoot, locale);
  const localeNamespaces = listNamespaceFiles(localeDir);

  const namespaceDiff = diffKeys(baseNamespaces, localeNamespaces);
  pushNamespaceDiffErrors(errors, locale, namespaceDiff);

  const sharedNamespaces = baseNamespaces.filter((namespace) => localeNamespaces.includes(namespace));
  sharedNamespaces.forEach((namespace) => validateNamespace(locale, namespace, baseDir, localeDir, errors));
}

function validateBaseLocaleSorting(baseDir, baseNamespaces, errors) {
  baseNamespaces.forEach((namespace) => {
    const baseJson = readJsonFile(path.join(baseDir, namespace));
    collectUnsortedObjectPaths(baseJson).forEach((objectPath) =>
      errors.push(`[${BASE_LOCALE}] non-alphabetical keys in ${namespace} at ${objectPath}`),
    );
  });
}

function reportAndExit(errors) {
  if (errors.length > 0) {
    console.error("Locale consistency check failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log("Locale consistency check passed.");
}

function main() {
  const localeDirs = listLocaleDirs();
  const { baseDir, baseNamespaces } = getBaseLocaleContext(localeDirs);
  const errors = [];

  for (const locale of localeDirs) {
    if (locale === BASE_LOCALE) {
      continue;
    }
    validateLocaleAgainstBase(locale, baseDir, baseNamespaces, errors);
  }

  validateBaseLocaleSorting(baseDir, baseNamespaces, errors);
  reportAndExit(errors);
}

main();
