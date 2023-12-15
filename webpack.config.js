const path = require("path");

module.exports = {
  entry: "./index.html", // Adjust the entry file based on your project
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};
