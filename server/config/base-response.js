/**
 * response 基本结构
 * */
function BaseResponse(baseFabricObj){
  this.resp_code=baseFabricObj.resp_code
  this.resp_msg=baseFabricObj.resp_msg
  this.biz_code=baseFabricObj.biz_code
  this.biz_msg=baseFabricObj.biz_msg
}
module.exports=BaseResponse
