/**
 * redis启动配置
 * */
let crypto = require('crypto')
let redis = require('redis')
let Logger=require('../config/log4js.conf')
// 获取redis配置
let canEditServerConf = require('../deployment_config/deployment-config')


let redisClient = redis.createClient(canEditServerConf.redis_port, canEditServerConf.redis_ip)

// let sessionExpire = 7200 // session过期时间设置

redisClient.on('error', function (e) {
  Logger.error('reidsClient出错了:' + e.message)
})

if (canEditServerConf.redis_password) {
  redisClient.auth(canEditServerConf.redis_password, function () {
    Logger.info('通过认证')
  })
}

module.exports = {
  /**
   * 保存用户session
   */
  saveLoginSession: function (userId, fn) {
    redisClient.select(canEditServerConf.redis_database_no, function (error) {
      if (error) {
        Logger.error('redis出错了：' + error.message)
      } else {
        // 1. 生成session字符串
        let session = createSession(userId)
        // 2. 查询是否有与当前userId对应的session存在
        redisClient.get(session, function (error, reply) {
          if (!error) {
            // 3. 如果存在则清除当前对应的session
            if (reply) {
              // 4. 销毁老的session
              redisClient.del(session, function (e) {
                if (!e) {
                  // 5. 以新的session为key存储用户信息(此处暂时存储userId，有需要再调整)
                  redisClient.set(userId,session, function (e) {
                    if (!e) {
                      // 6. 以新的session为key存储用户信息(此处暂时存储userId，有需要再调整)
                      redisClient.set(session, userId, function (e) {
                        if (!e) {
                          // 8. 返回session
                          fn(session)
                          // 7. 为新session设置过期时间
                          // redisClient.expire(session, sessionExpire, function (e) {
                          //   if (!e) {
                          //     // 8. 返回session
                          //     fn(session)
                          //   }
                          // })
                        }
                      })
                    }
                  })
                }
              })
            } else {
              // 5. 以新的session为key存储用户信息(此处暂时存储userId，有需要再调整)
              redisClient.set(userId,session, function (e) {
                if (!e) {
                  redisClient.set(session, userId, function (e) {
                    if(!e){
                      fn(session)
                    }
                  })
                  // 7. 为新session设置过期时间
                  // redisClient.expire(session, sessionExpire, function (e) {
                  //   if (!e) {
                  //     // 8. 返回session
                  //     fn(session)
                  //   }
                  // })
                }
              })
            }
          } else {
            Logger.error('查询是否有与当前userId对应的session存在出错了' + error.message)
          }
        })
      }
    })
  },
  /**
   * 销毁用户session
   */
  destroyLoginSession: function (session, fn) {
    redisClient.select(canEditServerConf.redis_database_no, function (error) {
      if (error) {
        Logger.error('redis出错了：' + error.message)
      } else {
        redisClient.del(session, function (error) {
          if (error) {
            Logger.error('redis销毁session失败：' + error.message)
          } else {
            fn()
          }
        })
      }
    })
  },
  /**
   * 验证用户session
   */
  verifyLoginSession: function (sessionVal, fn) {
    redisClient.select(canEditServerConf.redis_database_no, function (error) {
      if (error) {
        Logger.error('redis出错了：' + error.message)
        fn(false)
      } else {
        redisClient.exists(sessionVal, function (error, reply) {
          if (error) {
            Logger.error('redis执行exists方法出现异常:' + error.message)
            fn(false)
          } else {
            if (reply === 0) {
              Logger.error('redis --->: %s', reply)
              fn(false)
            } else {
              Logger.info('redis --->: %s', reply)
              fn(true)
            }
          }
        })
      }
    })
  },
  /**
   * 根据session获取UserID
   * @param session
   */
  getUserIdBySession: function (session, fn) {
    redisClient.get(session, function (error, reply) {
      if (!error) {
        fn(reply)
      } else {
        fn('')
      }
    })
  },
}

/**
 * 生成用户session码
 * @param userId
 */
function createSession(userId) {
  let sessionVal = {
    userId: userId,
    timeStamp: new Date().getTime()
  }

  let decipher = crypto.createHash('md5')
  let session = decipher.update(JSON.stringify(sessionVal)).digest('hex')

  return session
}


