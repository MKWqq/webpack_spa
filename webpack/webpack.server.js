// const merge = require("webpack-merge");
// const webpack = require("./config");
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env,argv) => {
  process.env.NODE_ENV=argv.mode
  return argv.mode==='production'?require('./prod.conf'):require('./dev.conf')
}
