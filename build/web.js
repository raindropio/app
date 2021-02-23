const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common')

const WebpackPwaManifest = require('webpack-pwa-manifest')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env={}) =>
    merge(
        common(env),
        {
            output: {
                path: path.resolve(__dirname, '..', 'dist', 'web', env.production?'prod':'dev'),
                publicPath: '/'
            },

            optimization: {
                splitChunks: {
                    maxInitialRequests: 10,
                    cacheGroups: {
                        vendors: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            chunks: 'all',
                            name: 'vendors'
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true
                        },
                        svgs: {
                            test: /[\\/]src\/.+\.svg$/,
                            chunks: 'all',
                            name: 'svgs'
                        }
                    }
                }
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env.APP_TARGET': JSON.stringify('web')
                }),

                //Service worker
                new CopyPlugin({
                    patterns: [
                        { from: 'assets/sw.js', to: 'sw.js' },
                        { from: 'assets/robots.txt', to: 'robots.txt' }
                    ]
                }),

                //PWA manifest
                new WebpackPwaManifest({
                    filename: 'manifest.webmanifest',
                    name: 'Raindrop.io',
                    short_name: 'Raindrop',
                    description: 'All in One Bookmark Manager',
                    start_url: '/',
                    display: 'minimal-ui',
                    background_color: '#0F0F47',
                    orientation: 'any',
                    icons: [
                        {
                            src: path.resolve('src/assets/brand/macos_512.png'),
                            destination: 'assets',
                            size: '512x512',
                            purpose: 'any'
                        },
                        {
                            src: path.resolve('src/assets/brand/maskable_512.png'),
                            destination: 'assets',
                            size: '512x512',
                            purpose: 'maskable'
                        }
                    ]
                })
            ]
        }
    )