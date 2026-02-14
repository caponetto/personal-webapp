import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";

const nycOutputDir = ".nyc_output";
const jestCoverageFinal = "dist-test/coverage/coverage-final.json";
const combinedJson = "dist-test/coverage/coverage-combined.json";
const mergedTempDir = `${nycOutputDir}/merged`;
const combinedReportDir = "dist-test/coverage-combined";

if (!existsSync(jestCoverageFinal)) {
  throw new Error(`Jest coverage file not found at ${jestCoverageFinal}. Run npm run test first.`);
}

mkdirSync(nycOutputDir, { recursive: true });
copyFileSync(jestCoverageFinal, `${nycOutputDir}/jest-coverage.json`);

execSync(`npx nyc merge ${nycOutputDir} ${combinedJson}`, { stdio: "inherit" });

mkdirSync(mergedTempDir, { recursive: true });
copyFileSync(combinedJson, `${mergedTempDir}/out.json`);

execSync(
  `npx nyc report --temp-dir ${mergedTempDir} --report-dir ${combinedReportDir} --reporter=html --reporter=lcov --reporter=text-summary`,
  { stdio: "inherit" },
);
