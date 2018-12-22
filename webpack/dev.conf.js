/**
 * 开发环境配置
 * */
var utils = require('./config/utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./base.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig,{
  mode: 'development',
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  devtool: 'eval-source-map',
  devServer: {
    ...config.dev.devServer
  },
  plugins: [
    // webpack>=4.x 使用mode:development，默认打开
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
    // normal setting
    // new webpack.HotModuleReplacementPlugin()
  ]
})
