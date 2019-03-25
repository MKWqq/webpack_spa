/**
 * 发送请求文件
 * */
var BaseResponse = require('../config/base-response')
var CanEditServerConf=require('../deployment_config/deployment-config')
var sessionManager=require('../database/redis-config')
var Logger = require('../config/log4js.conf')
var APIServerConfig=require('../config/api-server.conf')
var APIWhiteConfig=require('../config/api-white.conf')
var HandlerCode=require('../utils/code')
var handlerCode=new HandlerCode()
var URL=require('url')
var querystring = require('querystring')
var serverAddressURL=URL.parse(CanEditServerConf.serverAddress)
var APIServerHttp=serverAddressURL.protocol==='http:'?require('http'):require('https')
var InintPort=serverAddressURL.protocol==='http:'?80:443
module.exports={
  /**
   * http请求传递报文
   * @param req 请求体request
   * @param res 响应体response
   * @param path 业务路径
   * @param tag 请求标识
   * @param successFunc 成功回调函数
   * @param errorFunc 失败回调函数
   */
  REQUEST:function(req, res, successFunc, errorFunc){
    var userSession=req.cookies.u || ''
    if(APIWhiteConfig.includes(req.url)){
      sessionManager.verifyLoginSession(userSession,function(isLogin){
        if(isLogin){
          // 请求
          doRequest(req, res, successFunc, errorFunc)
        }else{
          // 未登录
          var resp_row={resp_code:1000,resp_msg:'',biz_code:'NODE_LOGIN',biz_msg:'未登录'}
          var baseResponse=new BaseResponse(resp_row)
          successFunc(baseResponse)
        }
      })
    } else{
      doRequest(req, res, successFunc, errorFunc)
    }
  }
}

/**
 * 请求
 * */
function doRequest(req, res, successFunc, errorFunc){
  var RSPData=''
  var requestParam=req.body
  var requestOptions={
    protocol:serverAddressURL.protocol,
    hostname:serverAddressURL.hostname,
    port:serverAddressURL.port===null?InintPort:serverAddressURL.port,
    path:(serverAddressURL.path==='/'?'':serverAddressURL.path)+req.url,
    method:req.method,
    headers:{
      'Content-Type':req.headers['content-type']?req.headers['content-type']:'application/json',
      'X-sign': handlerCode.signRequest(req,JSON.stringify(req.body),APIServerConfig.pramary_key),
      // 新token
      'Authorization': getCurrentAuth(req)
    }
  }

  Logger.info('请求地址[CMD:%s]--->:%s', req.url, requestOptions.protocol + '//' + requestOptions.hostname+':'+requestOptions.port + requestOptions.path)
  Logger.info('请求参数[CMD:%s]--->:%s', req.url, JSON.stringify(requestParam))

  var APIServerRequest=APIServerHttp.request(requestOptions,function(response){
    response.setEncoding('utf-8')
    response.on('data',function(chunk){
      RSPData+=chunk
    }).on('end',function(){
      if(this.statusCode!==200){
        Logger.info('请求出错[CMD:%s]--->(%s)%s', req.url, this.statusCode, this.statusMessage)
        let resp_row={resp_code:this.statusCode,resp_msg:this.statusMessage,biz_code:'',biz_msg:''}
        let baseResponse = new BaseResponse(resp_row)
        errorFunc({resp_info: baseResponse})
      }else{
        var isVerifyOK = handlerCode.verifySign(RSPData, this.headers['x-sign'],APIServerConfig.pramary_key)
        if (isVerifyOK) {
          Logger.info('请求结果[CMD:%s]--->:%s', req.url, RSPData)
          let refreshData = JSON.parse(RSPData)
          successFunc(refreshData)
        } else {
          Logger.info('请求结果[CMD:%s]--->:%s', req.url, RSPData)
          Logger.info('请求出错[CMD:%s]--->(%s)%s', req.url, this.statusCode, this.statusMessage)
          let resp_row={resp_code:'200',resp_msg:'接口调用成功(^_^)',biz_code:'本地验证签名失败',biz_msg:'NODE_SIGN'}
          let baseResponse = new BaseResponse(resp_row)
          errorFunc({resp_info: baseResponse})
        }
      }
    })
  }).on('error',function(e){
    Logger.info('请求失败[CMD:%s]--->(%s)%s', req.url, e.errorCode, e.message)
    var resp_row={resp_code:e.errorCode,resp_msg:e.message,biz_code:'',biz_msg:''}
    var BaseResponse = new BaseResponse(resp_row)
    errorFunc({resp_info: BaseResponse})
  })

  if(req.method!=='GET'||req.method!=='DELETE'){
    if(req.headers['content-type'] && req.headers['content-type']==='multipart/form-data'){
      APIServerRequest.write(requestParam)
    }else{
      APIServerRequest.write(JSON.stringify(requestParam),'utf-8')
    }
  }

  APIServerRequest.end()
}

/**
 * 获取、比较token
 */
function getCurrentAuth(req) {
  let currentAuth
  let bearer = 'Bearer '
  // req.url:比较是不是登录接口调用，如果是，那就是固定的值，如果否，那就是获取aToken
  if ('/auth/oauth/token' === req.url.split('?')[0]) {
    currentAuth = APIServerConfig.Authorization
  } else {
    currentAuth = bearer + req.cookie.atoken
  }
  return currentAuth
}
