/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "components-must-not-import-pages",
      severity: "error",
      from: {
        path: "^src/components/.+",
      },
      to: {
        path: "^src/pages/.+",
      },
    },
    {
      name: "cross-page-domain-imports",
      severity: "warn",
      from: {
        path: "^src/pages/(About|Journey|Text|Talk|Code)/.+",
      },
      to: {
        path: "^src/pages/(About|Journey|Text|Talk|Code)/.+",
        pathNot: "^src/pages/$1/.+",
      },
    },
  ],
  options: {
    tsPreCompilationDeps: true,
    doNotFollow: {
      path: "node_modules",
    },
    exclude: {
      path: ["^dist", "^dist-test", "^coverage", "^cypress", "(/|^)__tests__(/|$)", String.raw`\.test\.tsx?$`],
    },
    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/(?:@[^/]+/)?[^/]+",
      },
    },
  },
};
