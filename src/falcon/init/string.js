/**
 * init中处理selector是string的情况
 * @author [xiaoguang.hu]
 * @email [xiaoguang.hu@vhall.com]
 * @create date 2017-12-10 09:15:40
 * @modify date 2017-12-10 09:15:40
 * @desc [description]
 */

var falcon = require('./core.js');
//用于匹配html字符串和#id字符串
//此处falcon原正则/^(?:\s*(<[\w-]+>)[^>]*|#([\w-]+))$/ 无法匹配<xx>xxx</xx>
//匹配结果["<div>","<div>",undefined]或['#id',undefined,'id']
var rQuick = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;

//用于匹配独立的html标签,且标签内没有文本.<xx></xx>通过 <xx>xxxx</xx>不通过,匹配结果["<div></div>", "div"]
//jquery原正则表达式/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
//在下认为falcon没有那么多复杂的情况,可以精简正则如用\s替换上述各种空格 制表 换行等等
///^<(\w+)\s*\/?>(?:<\/\1>|)$/;原来是使用此正则,但会出现问题,如<xx/></xx>这种也可以通过,后修改如下
var rSingleTag = /^<(\w+)\s*(?:\/>|>(?:<\/\1>|))$/;

falcon.mixin({
    //data为html字符串,context上下文即document,keepScripts是否保持js代码(script)
    //返回对象世一个dom数组
    parseHTML: function(data, context, keepScripts) {
        var base, match, scripts;
        if (falcon.type(data) !== 'string') {
            return [];
        }
        //兼容第二参数不传情况
        if (falcon.type(context) === 'boolean') {
            keepScripts = context;
            context = false;
        }
        //如果上下文没传(jQuery这里考虑了xml的情况?document.implementation.createHTMLDocument("")?)
        //鉴于json当道,xml暂不考虑
        context = context || document;
        match = rSingleTag.exec(data);
        scripts = !keepScripts && [];

        //如果是单标签
        if (match) {
            return [context.createElement(match[1])];
        }

        match = falcon.buildFragment([data], context, keepScripts ? null : []);

        if (scripts && scripts.length) {
            //删除脚本
        }

        return falcon.merge([], match.childNodes);
    },
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
    buildFragment: function(elems, context, scripts) {
        var elem, tmpDiv,
            fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            len = elems.length;

        for (; i < len; i++) {
            elem = elems[i];
            if (elem) {

                if (falcon.type(elem) === 'object') {
                    //如果elem是一个对象或者DOM元素
                    falcon.merge(nodes, elem.nodeType ? [elem] : elem)
                } else if (1) {
                    //如果不是html标签,创建文本对象
                    nodes.push(context.createTextNode(elem))
                } else {
                    //如果是html标签
                    tmpDiv = tmpDiv || fragment.appendChild(context.createElement('div'));

                }
            }
        }
    }
});


function caseString(selector, context) {
    var match, doc, elem;
    //尝试匹配html标签,减少正则开销,模拟rQuick的匹配结果
    if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
        match = [null, selector, null];
    } else {
        match = rQuick.exec(selector);
    }

    if (match) {
        if (match[1]) {
            //如果context是falcon对象
            context = context instanceof falcon ? context[0] : context;
            //context没值或者不是dom元素直接返回document,否则先尝试返回ownerDocument,最后使用context
            doc = (context && context.nodeType ? context.ownerDocument || context : document);

            falcon.merge(this, falcon.parseHTML(match[1], doc, true));
        } else {
            elem = document.getElementById(match[2]);
            if (elem) {
                this[0] = elem;
                this.length = 1;
            }
        }
        return this;
    }
}

module.exports = caseString;