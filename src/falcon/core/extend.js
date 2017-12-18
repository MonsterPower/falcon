/**基础扩展
 * @author [xiaoguang.hu]
 * @email [xiaoguang.hu@vhall.com]
 * @create date 2017-12-18 01:40:27
 * @modify date 2017-12-18 01:40:27
 * @desc [description]
*/

var falcon = require('./index');

falcon.prototype.mixin({
    //此方法主要给内部使用,合并数组或类数组
    merge: function(target, source) {
        var len = source.length,
            i = 0,
            tLen = target.length;
        for (; i < len;) {
            target[tLen++] = source[i++];
        }
        target.length = tLen;
        return target;
    },
    makeArray:function (arr, results) {
        var ret = results || [];
      
        if (arr != null) {
          if (isArrayLike(Object(arr))) {
              jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
          } else {
              push.call(ret, arr);
          }
        }
      
        return ret;
    }
    
});