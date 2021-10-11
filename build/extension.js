const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default
const ZipPlugin = require('zip-webpack-plugin')

module.exports = (env={}, args={}) => {
    env.filename = '[name]'
    
    switch(env.vendor) {
        case 'chrome': env.sentry = { urlPrefix: 'chrome-extension://ldgfbffkinooeloadekpmfoklnobpien/' }; break
        case 'firefox': env.sentry = { urlPrefix: 'moz-extension://0e06d960-f461-414f-83d6-5d5b16938448/' }; break
        case 'opera': env.sentry = { urlPrefix: 'chrome-extension://omkjjddnkfagilfgmbmeeffkljlpaglj/' }; break
        case 'safari': env.sentry = { urlPrefix: 'safari-web-extension://F54B64D3-0D2D-4C9C-BDF5-8671C44683E7/' }; break
        case 'safari-ios': env.sentry = { urlPrefix: 'safari-web-extension://F54B64D3-0D2D-4C9C-BDF5-8671C44683E7/' }; break
    }

    return merge(
        common({...env, RAINDROP_ENVIRONMENT: 'browser-extension'}, args),
        {
            devtool: false, //extensions just ignore .map files

            entry: {
                manifest: './target/extension/manifest/index.js',
                background: './target/extension/background/index.js',
                portal: './target/extension/portal/index.js'
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
                ] : []),

                new HtmlWebpackPlugin({
                    filename: 'portal.html',
                    template: './target/extension/portal/index.ejs',
                    scriptLoading: 'defer',
                    inject: 'head',
                    chunks: ['portal']
                }),

                new HTMLInlineCSSWebpackPlugin()
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