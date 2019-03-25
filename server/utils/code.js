/**
 * 报文参数处理
 * */
var crypto = require('crypto')
class Code {
  cutChunk(chunk){
    let position = chunk.indexOf('=');
    let decodeData = decodeURIComponent(chunk.substr(position+1).replace(/\+/g, '%20'));
    return decodeData;
  }
  /**
   * @params:
   * req——request对象
   * code——加密数据
   * key——签名key
   * */
  signRequest(req,code,key){
    let MD5Hash = crypto.createHash('md5')
    if (req.method !== 'GET' && req.method !== 'DELETE') {
      MD5Hash.update(code + key)
    } else {
      MD5Hash.update(key)
    }

    let sign = MD5Hash.digest('hex')
    return sign
  }
  /**
   * @params:
   * sign——response 签名
   * code——加密数据
   * key——签名key
   * */
  verifySign(code, sign,key) {
    if (sign) {
      let isPass = false
      let MD5Hash = crypto.createHash('md5')
      let MD5Sign = MD5Hash.update(code + key).digest('hex')

      MD5Sign = MD5Sign.toUpperCase()
      sign = sign.toUpperCase()
      if (MD5Sign === sign) {
        isPass = true
      }
      return isPass
    } else {
      return false
    }
  }
  encodeUnicode(str){
    var res=[]
    for(let i=0;i<str.length;i++){
      if(str.charCodeAt(i)>255){
        // 中文
        let _unicodeString="\\u"+(str.charCodeAt(i).toString(16).slice(-4)).toUpperCase();
        res.push(_unicodeString)
      }else{
        res.push(str[i])
      }
    }
    return res.join("")
  }
}

module.exports = Code; 
