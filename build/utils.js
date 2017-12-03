var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./config');

module.exports = {
    resolve: function (dir) {
        return path.join(__dirname, '..', dir)
    },
    assetsPath: function (_path) {
        var assetsSubDirectory = process.env.NODE_ENV === 'production'
            ? config.prod.assetsSubDirectory
            : config.dev.assetsSubDirectory
        return path.join(assetsSubDirectory, _path)
    },
    assetspublicPath: function () {
        return process.env.NODE_ENV === 'production'
            ? config.prod.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    styleLoaders: function () {
        return process.env.NODE_ENV === 'production'
            ? [{
                // test: new RegExp('\\.' + extension + '$'),
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                browsers: ['last 5 versions']
                            })]
                        }
                    }]
                })
            }]
            : [{
                // test: new RegExp('\\.' + extension + '$'),
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }]
    },
};