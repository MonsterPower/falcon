/**
 * falcon的init函数,因为涉及情况较多,拆分为单个文件
 * @author [xiaoguang.hu]
 * @email [xiaoguang.hu@vhall.com]
 * @create date 2017-12-06 12:46:14
 * @modify date 2017-12-06 12:46:14
 * @desc [description]
 */

var falcon = require('./core.js');

//用于匹配html字符串和#id字符串
//jquery原正则表达式/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
//在下认为falcon没有那么多复杂的情况,可以精简正则
var rQuick = /^(?:\s*(<[\w-]+>)[^>]*|#([\w-]+))$/;

//用于匹配独立的html标签,且标签内没有文本.<xx></xx>通过 <xx>xxxx</xx>不通过
//jquery原正则表达式/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
//在下认为falcon没有那么多复杂的情况,可以精简正则如用\s替换上述各种空格 制表 换行等等
///^<(\w+)\s*\/?>(?:<\/\1>|)$/;原来是使用此正则,但会出现问题,如<xx/></xx>这种也可以通过,后修改如下
var rSingleTag =/^<(\w+)\s*(?:\/>|>(?:<\/\1>|))$/;

falcon.prototype.mixin({
    init: function(selector, context) {
        //处理一些无效情况,如"",null,undefined,false等
        if (!selector) {
            return this;
        } else if (typeof selector === 'string') {
            //处理字符串选择器
            //
            // var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            // var match = rquickExpr.exec(selector);

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