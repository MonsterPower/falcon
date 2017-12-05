/**
 * 基础标准库,代号:falcon
 * @author [xiaoguang.hu]
 * @email [xiaoguang.hu@vhall.com]
 * @create date 2017-11-28 11:46:32
 * @modify date 2017-11-28 11:46:32
 * @desc [description]
 */

var base = require('./base');


//falcon构造函数,一切的开始,想想还有点小激动
function falcon(selector, context) {
    //借鉴jquery经典的无new调用模式
    return new falcon.prototype.init(selector, context);
}

falcon.prototype = {
    constructor: falcon,
    verson: 0.1
}

//基础方法,为其他模块提供扩展falcon的能力
falcon.mixin = falcon.prototype.mixin = function() {
    //声明一些下面循环用到的变量,避免重复声明.
    var source, prop, src, copy, isArray, temp,
        target = arguments[0] || {},
        i = 1, //混合对象起始索引
        length = arguments.length,
        deep = false;

    // 如果是深复制
    if (typeof target === 'boolean') {
        deep = true;
        // target取第二个参数,当前i也后移++
        target = arguments[i] || {};
        i++;
    }

    //修正target的值,排除参数错误,如字符串或其他不符合的情况
    if (typeof target !== 'object' && !falcon.isFunction(target)) {
        target = {}
    }

    //如果是对falcon的扩展
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        //排除null或undefined等 这里jquery写的(source=arguments[i]) != null,鄙人觉得没必要,会不会有兼容问题?
        if ((source = arguments[i])) {
            for (prop in source) {
                src = target[prop];
                copy = source[prop];

                //跳过自身引用情况,避免死循环,如:var a={};mixin(a,{prop:a});
                if (copy === target) {
                    continue;
                }

                //深复制,isPlainObject纯粹对象,就是通过'{}'或'new Object'创建的对象,
                //因为bom或dom或通过prototype方式继承的对象可能比较复杂,为避免不确定因素或
                //复制大量属性花费大量时间,所以做了处理,只对PlainObject或数组对象进行深复制
                if (deep && copy && (falcon.isPlainObject(copy) || (isArray = falcon.isArray(copy)))) {
                    if (isArray) {
                        isArray = false;
                        temp = src && falcon.isArray(src) ? src : [];
                    } else {
                        temp = src && falcon.isPlainObject(copy) ? src : {};
                    }

                    //递归复制子属性
                    target[prop] = falcon.mixin(deep, temp, copy);
                } else {
                    //jquery的extend的处理是不复制undefined但是复制null,鄙人认为应该都复制,避免丢失属性
                    target[prop] = copy;
                }
            }
        }
    }

    return target;
}

//为falcon扩展一些静态方法
falcon.mixin({
    type: function(obj) {
        return base.typesMap[base.toString.call(obj)];
    },
    isFunction: function(obj) {
        return falcon.type(obj) === 'function';
    },
    isArray: Array.isArray || function(obj) {
        return falcon.type(obj) === 'array';
    },
    //isPlainObject纯粹对象,就是通过'{}'或'new Object'创建的对象,
    isPlainObject: function(obj) {
        //如果是非object情况,直接返回
        if (!obj || falcon.type(obj) !== 'object') {
            return false;
        }
        var proto = base.getProto(obj);

        //没原型,如Object.create(null),则是纯粹对象
        if (!proto) {
            return true;
        }

        var ctor = base.hasOwn.call(proto, 'constructor') && proto.constructor;

        //{}||new Object情况
        return falcon.type(ctor) === 'function' && base.fnToString.call(ctor) === base.ObjectFunctionString;
    },
    isNumberic: function(obj) {
        var type = falcon.type(obj);
        //包括字符串数字情况,后表达式为了过滤string情况
        return (type === 'number' || type === 'string') && !isNaN(obj - parseFloat(obj))
    }
});


module.exports = falcon;