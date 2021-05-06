const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')

const ZipPlugin = require('zip-webpack-plugin')

module.exports = (env={}) => {
    env.filename = '[name]'
    
    switch(env.vendor) {
        case 'chrome': env.sentry = { urlPrefix: 'chrome-extension://ldgfbffkinooeloadekpmfoklnobpien/' }; break
        case 'firefox': env.sentry = { urlPrefix: 'moz-extension://0e06d960-f461-414f-83d6-5d5b16938448/' }; break
        case 'opera': env.sentry = { urlPrefix: 'chrome-extension://omkjjddnkfagilfgmbmeeffkljlpaglj/' }; break
        case 'safari': env.sentry = { urlPrefix: 'safari-web-extension://F54B64D3-0D2D-4C9C-BDF5-8671C44683E7/' }; break
    }

    return merge(
        common(env),
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

            devServer: {
                writeToDisk: true,
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env.APP_TARGET': JSON.stringify('extension'),
                    'process.env.EXTENSION_VENDOR': JSON.stringify(env.vendor)
                }),

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
}