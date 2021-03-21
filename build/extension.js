const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')

const WriteFilePlugin = require('write-file-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')

module.exports = (env={}) =>
    merge(
        common({ ...env, filename: '[name]' }),
        {
            entry: {
                manifest: './target/extension/manifest/index.js',
                background: './target/extension/background/index.js'
            },

            output: {
                path: path.resolve(__dirname, '..', 'dist', env.vendor, env.production?'prod':'dev'),
                publicPath: ''
            },

            performance: {
                hints: false //because generated zip always big
            },

            optimization: {
                runtimeChunk: false
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env.APP_TARGET': JSON.stringify('extension'),
                    'process.env.EXTENSION_VENDOR': JSON.stringify(env.vendor)
                }),

                new WriteFilePlugin(),

                ...(env.production ? [
                    new ZipPlugin({
                        path: '../../',
                        filename: `${env.vendor}-${env.production?'prod':'dev'}.zip`,
                        exclude: []
                    })
                ] : [])
            ],

            module: {
                rules: [{
                    test: /manifest\/index\.js$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'manifest.json'
                            }
                        },
                        {
                            loader: 'val-loader',
                            options: env
                        }
                    ]
                }]
            }
        }
    )