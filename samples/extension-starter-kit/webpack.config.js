const path = require('path');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
      main: "./src",
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: "bundle.js",
    },
    resolve: {
      // Add ".ts" as resolvable extensions.
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" },
      ],
    },
  };