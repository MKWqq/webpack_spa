/**
 * 生产环境配置
 * */
var path = require('path')
var utils = require('./config/utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
// mode为production自动开启
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig,{
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.prod.cssSourceMap,
      extract: true// 是否拆分css，用extract-text-webpack-plugin
    })
  },
  output: {
    path:config.prod.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  devtool: config.prod.cssSourceMap ? '#source-map' : false,
  optimization: {
    // adds an additional chunk to each entry point containing only the runtime.
    /*runtimeChunk: {
      name: 'runtimeChunk'
      // name: entrypoint => `runtimechunk~${entrypoint.name}`
    },*/
    // >=webpack4.0用法，但使用mode:production，默认打开
    minimize: true,
    // normal setting
    // 提公共方法
    splitChunks: {
      chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      // cacheGroups: {
      //     styles: {
      //         name: 'styles',
      //         test: /\.css$/,
      //         chunks: 'all',
      //         enforce: true,
      //     },
      // }
    },
    minimizer: [
      // >=webpack4.x用法，但使用mode:production，默认打开
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        }
      }),
      // normal setting
      new OptimizeCSSPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {safe: true, discardComments: {removeAll: true}},
        canPrint: true
      })
    ]
  },
  plugins: [
    // >=webpack4.x用法，但使用mode:production，默认打开
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // normal setting
    new webpack.HashedModuleIdsPlugin(),
    // extract css
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      chunkFilename: utils.assetsPath("css/[name].[contenthash].css")
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    // copy from static to new path
    new CopyWebpackPlugin([
      {
        from: resolve(config.common.staticPath),
        to: config.prod.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // 压缩资源 gzip
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
    }),
    // 清除文件
    new CleanWebpackPlugin([config.common.cleanDir],{
      root:config.common.cleanPath
    })
  ]
})
