var path = require('path');
var express = require('express');
var webpack = require('webpack');
var opn = require('opn');
var proxyMiddleware = require('http-proxy-middleware');

var config = require('./config');
var webpackConfig = require('./webpack.dev.conf');

var port = config.dev.port;
var autoOpenBrowser = config.dev.autoOpenBrowser;
var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(webpackConfig);
//编译到内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});
//热加载
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => { }
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
