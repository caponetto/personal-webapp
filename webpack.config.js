const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = async (_env, argv) => {
  const isDevelopment = argv.mode === "development";
  const gtmResource = getGtmResource();
  const devtool = isDevelopment ? { devtool: "inline-source-map" } : {};
  const sourceMapsLoader = isDevelopment
    ? [
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
      ]
    : [];

  return [
    {
      entry: {
        index: "./src/index.tsx",
      },
      ...devtool,
      performance: {
        maxEntrypointSize: 1024 * 1024 * 2,
        maxAssetSize: 1024 * 1024 * 2,
      },
      output: {
        path: path.resolve("./dist"),
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
      },
      stats: {
        excludeModules: true,
      },
      optimization: {
        minimizer: [`...`, new JsonMinimizerPlugin(), new HtmlMinimizerPlugin()],
      },
      module: {
        rules: [
          ...sourceMapsLoader,
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  compilerOptions: {
                    sourceMap: false,
                  },
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        modules: [path.resolve("./node_modules"), path.resolve("./src")],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./static/index.html",
          inject: false,
          minify: false,
        }),
        new HtmlReplaceWebpackPlugin([
          {
            pattern: /(<!-- gtm):([\w-/]+)(\s*-->)?/g,
            replacement: (match, _gtm, type) => {
              if (gtmResource) {
                return gtmResource[type] ?? `${match}`;
              }
              return `${match}`;
            },
          },
        ]),
        new EnvironmentPlugin({
          WEBPACK_REPLACE__contextPath: getContextPath(),
          WEBPACK_REPLACE__version: getVersion(),
        }),
        new CopyPlugin({
          patterns: [
            { from: "./static/locales", to: "./static/locales" },
            { from: "./static/images", to: "./static/images" },
            { from: "./static/favicon", to: "./static/favicon" },
            { from: "./static/slides", to: "./static/slides" },
            { from: "./static/robots.txt", to: "./robots.txt" },
            { from: "./static/site.webmanifest", to: "./site.webmanifest" },
          ],
        }),
      ],
      devServer: {
        server: "https",
        host: "0.0.0.0",
        port: 9001,
        compress: true,
        historyApiFallback: true,
        static: [path.join(__dirname, "./dist"), path.join(__dirname, "./static")],
      },
    },
  ];
};

function getVersion() {
  const version = process.env.VERSION;
  console.info(`Version :: ${version}`);
  return version ?? process.env.USER ?? "local";
}

function getContextPath() {
  const contextPath = process.env.CONTEXT_PATH;
  console.info(`Context Path :: ${contextPath}`);
  return contextPath ?? "";
}

function getGtmResource() {
  const gtmId = process.env.GTM_ID;
  console.info(`Google Tag Manager ID :: ${gtmId}`);

  if (!gtmId) {
    return undefined;
  }

  return {
    id: gtmId,
    header: `<!-- Google Tag Manager -->
    <script>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    </script>
    <!-- End Google Tag Manager -->`,
    body: `<!-- Google Tag Manager (noscript) -->
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      >
      </iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->`,
  };
}
