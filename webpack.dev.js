/* eslint import/no-extraneous-dependencies: "off" */

const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    headers:{
    	"Access-Control-Allow-Origin":"*"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
});
