const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = async (env, argv) => [
  {
    entry: {
      index: "./src/index.tsx",
    },
    output: {
      path: path.resolve("./dist"),
      filename: "[name].js",
      chunkFilename: "[name].bundle.js",
    },
    stats: {
      excludeModules: true,
    },
    performance: {
      maxAssetSize: 30000000,
      maxEntrypointSize: 30000000,
    },
    module: {
      rules: [
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
          pattern: /(<!-- gtm):([\w-\/]+)(\s*-->)?/g,
          replacement: (match, gtm, type) => {
            const gtmResource = getGtmResource(argv);
            if (gtmResource) {
              return gtmResource[type] ?? `${match}`;
            }
            return `${match}`;
          },
        },
      ]),
      new CopyPlugin({
        patterns: [
          { from: "./static/images", to: "./static/images" },
          { from: "./static/favicon", to: "./static/favicon" },
          { from: "./static/slides", to: "./static/slides" },
          { from: "./static/robots.txt", to: "./static/robots.txt" },
          { from: "./static/site.webmanifest", to: "./static/site.webmanifest" },
        ],
      }),
    ],
    devServer: {
      historyApiFallback: true,
      static: [path.join(__dirname, "./dist"), path.join(__dirname, "./static")],
      compress: true,
      port: 9001,
    },
  },
];

function getGtmResource() {
  const gtmId = undefined; //"GTM-TX4N6TH";
  console.info(`Google Tag Manager :: ID: ${gtmId}`);

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
