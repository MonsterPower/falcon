var utils = require('./utils')
var config = require('./config');

module.exports = {
    entry: {
        app: utils.resolve('src/index.js')
    },
    output: {
        path: config.prod.assetsRoot,
        filename: '[name].js',
        publicPath: utils.assetspublicPath()
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': utils.resolve('src')
        }
    },
    module: {
        rules: [{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}