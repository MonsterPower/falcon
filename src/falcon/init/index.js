/**
 * falcon的init函数,因为涉及情况较多,拆分为单个文件
 * @author [xiaoguang.hu]
 * @email [xiaoguang.hu@vhall.com]
 * @create date 2017-12-06 12:46:14
 * @modify date 2017-12-06 12:46:14
 * @desc [description]
 */

var falcon = require('./core.js');
var caseString = require('./init/string');

falcon.prototype.mixin({
    init: function(selector, context) {
        //处理一些无效情况,如"",null,undefined,false等
        if (!selector) {
            return this;
        } else if (typeof selector === 'string') {
            //处理字符串情况
            caseString(selector, context)
        } else if (selector.nodeType) {
            //处理DOM元素
            this[0] = selector;
            this.length = 1;
            return this;
        } else if (falcon.isFunction(selector)) {
            //处理ready方法

        } else if (selector.selector !== undefined) {
            //处理falcon对象
        }

        return this;
    }
});

//修正init原型指向,确保init实例对象可以访问falcon的原型
falcon.prototype.init.prototype = falcon.prototype;