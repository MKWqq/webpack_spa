/**
 * log4js configuration
 * */

let log4js = require('log4js')
let path=require('path')
var APIServerConfig=require('./api-server.conf')
function resolve(_dir){
  return path.join(__dirname,'..',_dir)
}

log4js.configure({
  appenders: {
    AXINDF_INFO: {
      type: APIServerConfig.log4jsOutType, filename: resolve('logs/info.log'), maxLogSize: 1024 * 100,//bytes
      backups: 4
    }
  },
  categories: {
    //日志默认配置
    default: {appenders: [ 'AXINDF_INFO'],level:'info'}//去掉'out'。控制台不打印日志
  }
})

// .getLogger() 可以获得 log4js 的 Logger 实例
const logger = log4js.getLogger('AXINDF_INFO')

// 使用方式
// logger.trace('Entering cheese testing')
// logger.debug('Got cheese.')
// logger.info('Cheese is Gouda.')
// logger.warn('Cheese is quite smelly.')
// logger.error('Cheese is too ripe!')
// logger.fatal('Cheese was breeding ground for listeria.')
module.exports = logger
