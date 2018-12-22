/**
 * webpack配置文件
 * */
var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  common: {
    importFilePath: '../',// 引入模板路径——以context路径为基准。默认为以进程当前的工作目录process.cwd()
    staticPath: 'client/static',// 项目静态文件路径
    cleanDir: 'public',// 清除打包文件夹名
    cleanPath: resolve('server')// 清除根路径
  },
  prod: {
    env: 'production',
    assetsPublicPath: '/',// 输出js文件引用路径
    assetsRoot: resolve('server/public'),// 输出js文件路径
    assetsSubDirectory: 'static',// 输出静态文件【如css、common chunk等】 文件夹名
    cssSourceMap: false// 是否启用source map
  },
  dev: {
    env: 'development',
    assetsPublicPath: '/',// 输出js文件引用路径
    assetsRoot: resolve('server/public'),// 输出js文件路径
    assetsSubDirectory: 'static',// 输出静态文件【如css、common chunk等】 文件夹名
    cssSourceMap: false,// 是否启用source map
    // devServer
    devServer: {
      contentBase: resolve('server/public'),
      publicPath: '/',// 管理静态文件目录
      host: 'localhost',
      port: '9000',
      hot: true,
      inline: true,
      open: false,
      historyApiFallback: true,
      disableHostCheck: true,
      compress: true,
      stats: { colors: true },
      proxy: {
        "/api": {
          target: "http://localhost:7000",
          changeOrigin: true,
          pathRewrite: {"^/api": ""}
        }
      }
    }
  }
}
