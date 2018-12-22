/**
 * server配置信息
 * */
var env=process.env.NODE_ENV
var CONFIGS={
  local:{
    log4jsOutType: 'console',
    pramary_key:'axinfu',
    Authorization: 'Basic YXBwOmFwcA=='
  },
  preview:{
    log4jsOutType: 'file',
    pramary_key:'axinfu',
    Authorization: 'Basic YXBwOmFwcA=='
  },
  online:{
    log4jsOutType: 'file',
    pramary_key:'axinfu',
    Authorization: 'Basic YXBwOmFwcA=='
  }
}
module.exports=CONFIGS[env]||CONFIGS['local']
