# personal-webapp

[![CI](https://github.com/caponetto/personal-webapp/actions/workflows/ci.yml/badge.svg)](https://github.com/caponetto/personal-webapp/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/caponetto/personal-webapp.svg)](https://github.com/caponetto/personal-webapp/blob/main/LICENSE)

Code of my personal [website](https://caponetto.dev).

## Requirements

- Node `22+`

## Build for development

Run `npm install && npm run build:dev`

## Running for development

Run `npm run start` and then access `https://localhost:9000`

## Local checks

- `npm run check:staged`: runs lint + format only for staged files (used by `pre-commit`).
- `npm run verify`: runs full local validation (`check:types`, `check:types:cypress`, `check:locales`, `check:format`, and `test`) and is used by `pre-push`.

## Quality gates

- `npm run verify`: baseline local quality gate (types, locale consistency, formatting, and Jest tests).
- `npm run coverage:combined`: merges Jest + Cypress coverage into one report (`dist-test/coverage-combined`).
- `npm run coverage:check`: enforces repository coverage thresholds from merged coverage data.
- `npm run check:deps:boundaries`: validates architectural dependency rules with dependency-cruiser.
- `npm run check:deps:unused`: checks unused dependencies with Knip (dependency-focused mode).
- `npm run check:size`: builds production assets and enforces JS bundle budget.

## CI workflows

- `CI`: core gate (verify, dependency boundaries, dependency usage advisory, bundle size, Cypress run, merged coverage upload).
- `Commitlint`: validates PR commit messages against conventional commit rules.
- `Signed Commits`: validates that commits in PRs are GitHub-verified signed commits.
- `Dependency Review` + `CodeQL` + `Security Audit`: supply-chain and code security checks.
- `Lighthouse` + `Visual Regression`: UI quality guardrails for performance/accessibility and visual stability.

## End-to-end tests (Cypress)

- `npm run e2e:open`: starts the app and opens Cypress in interactive mode (primary command).
- `npm run e2e:run`: starts the app and runs Cypress in headless mode (primary command).
- `npm run e2e:open:raw`: opens Cypress directly (without starting the local app server).
- `npm run e2e:run:raw`: runs Cypress directly (without starting the local app server).
- `CYPRESS_BASE_URL`: optional override for test target (default: `https://127.0.0.1:9000`).
- `npm run coverage:combined`: runs Jest + Cypress coverage and merges both into one report.

Test organization:

- `cypress/e2e`: user-facing scenarios.
- `cypress/pages`: selectors + domain actions (no assertions).
- `cypress/support`: custom commands and global setup.
- `cypress/fixtures`: reusable test data.

Combined coverage output:

- HTML report: `dist-test/coverage-combined/index.html`
- LCOV file: `dist-test/coverage-combined/lcov.info`

## Build for production

Run `npm install && npm run build:prod`

Artifacts will be available in the `dist` directory.

## License

This code is released under Apache License.

Check [LICENSE](LICENSE) file for more information.
