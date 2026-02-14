const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const cypressPlugin = require("eslint-plugin-cypress");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const globals = require("globals");

module.exports = [
  {
    ignores: ["dist/**", "dist-test/**", "node_modules/**", "coverage/**", ".nyc_output/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/refs": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/__tests__/**/*.{js,jsx,ts,tsx}", "**/*.{test,spec}.{js,jsx,ts,tsx}", "src/jest/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    ...cypressPlugin.configs.recommended,
    files: ["cypress/**/*.{js,jsx,ts,tsx}"],
  },
  {
    files: ["eslint.config.js", "webpack.config.js", "babel.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["cypress/support/commands.ts"],
    rules: {
      "@typescript-eslint/no-namespace": "off",
    },
  },
];
