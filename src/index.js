var falcon = require('./falcon/main');


window.a = { name: 'test', info: { age: 12 } };
window.b = { info: { sex: '男', addr: '北京通州' } };
window.falcon = falcon;
console.log(window.c = falcon.mixin({}, a, b));
console.log(falcon.mixin({ helloworld: function() { console.log('你好,世界') } }));