// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    prod: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        //以下需要查询确认
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': { //这里是需要代理的接口
                target: 'http://test.mrich.com', //这里是目标域名 
                changeOrigin: true, //这里是改变origin的开关 
                pathRewrite: {
                    '^/api': '/api' //这里是需要重写的接口，'^'表示起始位置 
                }
            }
        }
    }
}
