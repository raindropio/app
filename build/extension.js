const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')

module.exports = (env='development') =>
    merge(
        common({ env, filename: '[name]' }),
        {
            output: {
                path: path.resolve(__dirname, '..', 'dist', env, 'extension'),
                publicPath: ''
            },

            optimization: {
                minimize: false
            },

            performance: {
                hints: false //because minification is off
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env.APP_TARGET': JSON.stringify('extension')
                })
            ]
        }
    )