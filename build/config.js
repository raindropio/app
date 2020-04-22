const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

//Params
process.env.APP_TARGET = process.env.APP_TARGET || 'default'
process.env.APP_PUBLIC_PATH = process.env.APP_PUBLIC_PATH || ''

const isProd = (process.env.NODE_ENV == 'production')

module.exports = {
	context:	path.resolve(__dirname, '../src'),
	mode:		process.env.NODE_ENV,
	devtool:	isProd ? 'source-map' : 'cheap-module-eval-source-map',
	cache:		isProd,
	performance: {
		hints: false,//!isProd ? false : 'error',
		maxEntrypointSize: 2000000,
		maxAssetSize: 2000000
	},
	optimization: {
		minimize: isProd,
		runtimeChunk: true,
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
				},
				jsons: {
					test: /[\\/]src\/.+\.json$/,
					chunks: 'all',
					name: 'jsons'
				}
			}
		}
	},

	entry: {
		app: './index.jsx'
	},
	
	output: {
		filename:	'assets/[name].[hash].js',
		path:		path.resolve(__dirname, '..', 'dist', process.env.APP_TARGET),
		publicPath:	process.env.APP_PUBLIC_PATH
	},

	devServer: {
		compress: true,
		disableHostCheck: true,
		//hot: true,inline: true,
		overlay: true,
		port: 80
	},

	resolve: {
		symlinks: false,
		extensions: ['.js', '.jsx'],
		modules: [
			path.resolve(__dirname, '../node_modules')
		],
		alias: {
			api: __dirname + '/../src/modules/api.js',
			network: __dirname + '/../src/modules/network.js',
			config: __dirname + '/../src/modules/config.js',
			icon: __dirname + '/../src/co/common/icon.jsx',
			t: __dirname + '/../src/modules/translate.js',

			lodash: 'lodash-es'
		}
	},

	plugins: [
		//Pre plugins
		...(isProd ? [
			//Clean dist folder
			new CleanWebpackPlugin()
		] : [
			new WriteFilePlugin()
		]),

		new webpack.DefinePlugin({
			__TARGET__ : JSON.stringify(process.env.APP_TARGET),
			__DEV__: JSON.stringify(!isProd),
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			RAINDROP_ENVIRONMENT: JSON.stringify('browser'),

			__ABOUT__: JSON.stringify({
				version: JSON.parse(fs.readFileSync(__dirname+'/../package.json', 'utf8')).version
			})
		}),

		new webpack.ExternalsPlugin('commonjs', ['electron']),

		//HTML
		new HtmlWebpackPlugin({
			title: 'Raindrop.io',
			template: './index.ejs',
			favicon: './assets/icons/favicon.ico',
			hash: false,//!options.debug
			inject: 'head',
			minify: false
		}),

		//CSS
		new MiniCssExtractPlugin({
			filename: 'assets/[name].[hash].css',
			chunkFilename: '[id].css'
		}),

		//Post plugins
		...(isProd ? [
			
		] : []),
	],

	module: {
		noParse: /node_modules\/localforage\/dist\/localforage.js/,

		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},

			{
				test: /\.(styl|css)$/,
				use: [
					...(isProd ? [MiniCssExtractPlugin.loader] : ['style-loader']),
					{
						loader: 'css-loader',
						options: {
							modules: false
						}
					},
					'stylus-loader'
				]
			},

			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							name: '[name]',
							prefixize: false
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [
									{ transformsWithOnePath: true },
									{ removeTitle: true },
									{ removeUselessStrokeAndFill: true },
									{ removeAttrs: { attrs: '(stroke|fill)' } },
									{ removeViewBox:false }
								]
							}
						},
					}
				]
			},

			{
				test: /.*\.(gif|png|jpe?g|ico)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							disable: !isProd
						},
					},
				],
			}
		]
	}
};