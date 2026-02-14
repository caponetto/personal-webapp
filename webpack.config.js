const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = async (_env, argv) => {
  const isDevelopment = argv.mode === "development";
  const enableCoverageInstrumentation = process.env.CYPRESS_COVERAGE === "true";
  const gtmResource = getGtmResource();
  const devtool = isDevelopment ? { devtool: "eval-cheap-module-source-map" } : {};
  const sourceMapsLoader = isDevelopment
    ? [
        {
          test: /\.js$/,
          enforce: "pre",
          include: [path.resolve("./src")],
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
        filename: isDevelopment ? "[name].js" : "[name].[contenthash].js",
        chunkFilename: isDevelopment ? "[name].bundle.js" : "[name].[contenthash].bundle.js",
        clean: true,
      },
      cache: {
        type: "filesystem",
      },
      stats: {
        excludeModules: true,
      },
      optimization: {
        ...(isDevelopment
          ? {}
          : {
              runtimeChunk: "single",
              splitChunks: {
                chunks: "all",
                cacheGroups: {
                  reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
                    name: "react-vendor",
                    priority: 30,
                  },
                  muiVendor: {
                    test: /[\\/]node_modules[\\/]@mui[\\/]/,
                    name: "mui-vendor",
                    priority: 20,
                  },
                  vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    priority: 10,
                  },
                },
              },
            }),
        minimizer: [`...`, new JsonMinimizerPlugin(), new HtmlMinimizerPlugin()],
      },
      module: {
        rules: [
          ...sourceMapsLoader,
          {
            test: /\.tsx?$/,
            use: [
              ...(enableCoverageInstrumentation
                ? [
                    {
                      loader: "babel-loader",
                      options: {
                        plugins: ["istanbul"],
                      },
                    },
                  ]
                : []),
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
            use: [
              {
                loader: "style-loader",
                options: {
                  esModule: false,
                },
              },
              "css-loader",
            ],
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
          inject: "body",
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
        open: false,
        server: "https",
        host: "0.0.0.0",
        port: 9000,
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
