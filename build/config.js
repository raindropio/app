const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//const WriteFilePlugin = require('write-file-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

//Params
process.env.APP_TARGET = process.env.APP_TARGET || 'default'
process.env.APP_PUBLIC_PATH = process.env.APP_PUBLIC_PATH || ''

const isProd = (process.env.NODE_ENV == 'production')

module.exports = {
	context:	path.resolve(__dirname, '../src'),
	mode:		process.env.NODE_ENV,
	devtool:	isProd ? 'source-map' : 'cheap-module-eval-source-map',
	performance: {
		hints: false,//!isProd ? false : 'error',
		maxEntrypointSize: 2000000,
		maxAssetSize: 2000000
	},
	optimization: {
		minimize: isProd,
		minimizer: [
			new TerserJSPlugin({
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin({})
		],
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
		app: './index.js'
	},
	
	output: {
		filename:	'[name].[contenthash].js',
		path:		path.resolve(__dirname, '..', 'dist', isProd?'':'dev', process.env.APP_TARGET),
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
		extensions: ['.js'],
		modules: [
			path.resolve(__dirname, '../node_modules')
		],
		alias: {
			lodash: 'lodash-es'
		}
	},

	plugins: [
		//Pre plugins
		...(isProd ? [
			//Clean dist folder
			new CleanWebpackPlugin(),
			new LodashModuleReplacementPlugin()
		] : [
			//new WriteFilePlugin()
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
			template: './index.html',
			favicon: './assets/icons/favicon.ico',
			minify: false
		}),

		//CSS
		new MiniCssExtractPlugin({
			filename: '[contenthash].css',
			chunkFilename: '[id].[contenthash].css'
		}),

		//Post plugins
		...(isProd ? [
			
		] : []),
	],

	module: {
		noParse: /node_modules\/localforage\/dist\/localforage.js/,

		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},

			{
				test: /\.(styl|css)$/,
				sideEffects: true,
				use: [
					...(isProd ? [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: true,
							hmr: !isProd
						},
					}] : ['style-loader']),
					'css-loader',
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
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets',
							name: '[contenthash].[ext]'
						}
					},
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