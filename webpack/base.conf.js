/**
 * 基础配置
 * */
var path = require('path')
var config = require('./config')
var utils = require('./config/utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: __dirname,
  entry: {
    /* 或者在入口js文件中import 'babel-polyfill'即可 */
    home: ['babel-polyfill', config.common.importFilePath + '/client/home/main.js'],// 依赖打包
    login: ['babel-polyfill', config.common.importFilePath + '/client/login/login.js']
  },
  output: {
    filename: '[name].js',
    path: process.env.NODE_ENV === 'production' ? config.prod.assetsRoot : config.dev.assetsRoot,
    // 构建好文件的访问路径
    publicPath: process.env.NODE_ENV === 'production' ? config.prod.assetsPublicPath : config.dev.assetsPublicPath
  },
  module: {
    rules: [
      // {
      //     test: /\.(js|jsx)$/,
      //     loader: "eslint-loader",
      //     enforce: "pre",// 指定为前置类型 pre/post
      //     include: [resolve("client"),resolve("server")],
      //     options: {
      //         formatter: require("eslint-friendly-formatter")
      //     }
      // },
      {
        test: /\.jsx?/,
        include: [
          resolve('client')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        include: [resolve('client')],
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve('client')
    }
    // modules: [
    //     path.resolve("src"),
    //     path.resolve("."),
    //     "node_modules"
    // ]
  },
  optimization: {
    //parent chunk中解决了的chunk会被删除
    removeAvailableModules: true,
    //删除空的chunks
    removeEmptyChunks: true,
    //合并重复的chunk
    mergeDuplicateChunks: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './home/index.html',// 由output.path作为基路径
      template: config.common.importFilePath + '/client/home/index.html',
      chunks: ['home'],// 引入模块名
      inject: true,
      favicon: resolve('favicon.png'),    // 页签图标
      // minify在mode为production时，默认为true，否则为false
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true, // 压缩 HTML 中出现的 JS 代码
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: './login/login.html',// 由output.path作为基路径
      template: config.common.importFilePath + '/client/login/login.html',
      chunks: ['login'],// 引入模块名
      inject: true,
      favicon: resolve('favicon.png'),    // 页签图标
      // minify在mode为production时，默认为true，否则为false
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true, // 压缩 HTML 中出现的 JS 代码
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
}
