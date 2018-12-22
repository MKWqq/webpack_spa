/**
 * request router
 * */
let express=require('express')
let router=express.Router()
let BaseRequest=require('../api/base-request')
// let BaseResponse=require('../config/base-response')

router.get('/test',function(req,res,next){
  BaseRequest.REQUEST(req, res, function (data) {
    res.json(data)
  }, function (BaseResponse) {
    res.json(BaseResponse)
  })
})

module.exports=router
