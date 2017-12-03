var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

var config = require('./config');
process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = [utils.resolve('build/dev-client')].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders()
    },
    // cheap-module-eval-source-map is faster for development
    // devtool: '#cheap-module-eval-source-map',
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]
})