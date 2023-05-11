// commonJS
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: "./js/main.js",
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  // return bundle
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 8KB 미만 이미지만 인라인 처리
              name: "[name].[ext]",
              outputPath: "image/",
              publicPath: "/static/image/",
              fallback: "file-loader",
            },
          },
        ],
      },
    ],
  },

  // set up plugin
  plugins: [
    new HtmlPlugin({
      template: "./index.html",
      hash: true,
      favicon: "./static/favicon.ico",
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
  ],

  // add host
  devServer: {
    host: "localhost",
  },
};

// npm run build
