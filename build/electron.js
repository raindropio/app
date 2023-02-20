const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')

const ZipPlugin = require('zip-webpack-plugin')

module.exports = (env={}, args={}) =>
    merge(
        common(env, args),
        {
            output: {
                path: path.resolve(__dirname, '..', 'dist', 'electron', env.production?'prod':'dev'),
                publicPath: ''
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env.APP_TARGET': JSON.stringify('electron')
                }),

                ...(env.production ? [
                    new ZipPlugin({
                        path: '../../',
                        filename: `electron-${env.production?'prod':'dev'}.zip`,
                        exclude: []
                    })
                ] : [])
            ]
        }
    )