/**
 * 此文件内包含一些基础数据和方法的引用,减少原型查找,提高效率
 * @author [xiaoguang.hu]
 * @email [xiaoguang.hu@vhall.com]
 * @create date 2017-11-30 12:19:46
 * @modify date 2017-11-30 12:19:46
 * @desc [description]
 */

//职责链模式扩展
Function.prototype.after = function(fn) {
    var self = this;
    return function() {
        var ret = self.apply(this, arguments);
        if (ret === 'next') {
            return fn.apply(this, arguments);
        }
        return ret;
    }
}

module.exports = {
    typesMap: {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regexp',
        '[object Object]': 'object',
        '[object Error]': 'error',
        '[object Symbol]': 'symbol',
        '[object Null]': 'null',
        '[object Undefined]': 'undefined'
    },
    toString: Object.prototype.toString,
    getProto: Object.getPrototypeOf,
    hasOwn: Object.hasOwnProperty,
    fnToString: Function.prototype.toString,
    //Object.prototype.toString.call(Object)=>"[object Function]"
    //Function.prototype.toString.call(Object)=>function Object() { [native code] }
    //so 这个变量代表的就是Object构造函数,用于判断对象的构造函数是否是Object构造函数
    ObjectFunctionString: Function.prototype.toString.call(Object)
}