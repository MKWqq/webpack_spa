/**
 * node start file
 * Date 2018/12/21
 * */
var express=require('express')
var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')
var path=require('path')
var utils=require('./utils/server-utils')
var Logger=require('./config/log4js.conf')
var app=express()

app.get('/',function(req,res){
  res.redirect('/home/index.html')
})

/* 解析body */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.raw({inflate: true, limit: '10000kb', type: 'multipart/form-data'}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'), {maxage: '12h'}))
// app.use('/mobile',express.static(path.join(__dirname, 'public'), {maxage: '12h'}))

// 跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')//预检请求使用
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')//预检请求使用
  next()
})

// 设置接口路由
app.use('/mobile/interaface',require('./routes/common'))

// port
app.set('port', process.env.PORT || 7000)
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

// 处理系统级异常
process.on('uncaughtException', function (err) {
  Logger.error('[tm:' + utils.getNowFormatDate() + ']',err);

  // 系统退出
  // process.exit(1);
});
