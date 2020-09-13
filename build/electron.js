const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')

module.exports = (env='development') =>
    merge(
        common({ env }),
        {
            output: {
                path: path.resolve(__dirname, '..', 'dist', env, 'electron'),
                publicPath: ''
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env.APP_TARGET': JSON.stringify('electron')
                })
            ]
        }
    )