const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')

module.exports = (env={}) =>
    merge(
        common({ ...env, filename: '[name]' }),
        {
            entry: {
                manifest: './extension/manifest.json.js'
            },

            output: {
                path: path.resolve(__dirname, '..', 'dist', env.vendor, env.production?'prod':'dev'),
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
            ],

            module: {
                rules: [{
                    test: /manifest\.json\.js$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'manifest.json'
                            }
                        },
                        {
                            loader: 'val-loader',
                            options: {
                                vendor: 'chrome'
                            }
                        }
                    ]
                }]
            }
        }
    )