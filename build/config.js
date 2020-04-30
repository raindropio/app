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
				}
			}
		}
	},

	entry: {
		app: './index.js'
	},
	
	output: {
		filename:	'assets/[name].[contenthash].js',
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
		symlinks: true,
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
			template: './assets/index.ejs',
			favicon: './assets/images/icons/favicon.ico',
			hash: true,
			scriptLoading: 'defer',
			inject: 'body'
		}),

		//CSS
		new MiniCssExtractPlugin({
			filename: '[contenthash].css',
			chunkFilename: 'assets/[contenthash].css'
		}),

		//Post plugins
		...(isProd ? [
			
		] : []),
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				oneOf: [
					{
						resourceQuery: /asis/,
						loader: 'file-loader',
						options: {
							outputPath: 'assets',
							name: '[contenthash].[ext]'
						}
					},
					{
						loader: 'babel-loader'
					}
				]
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
				oneOf: [
					{
						resourceQuery: /asis/,
						loader: 'file-loader',
						options: {
							outputPath: 'assets',
							name: '[contenthash].[ext]'
						}
					},
					{
						loader: 'svg-sprite-loader',
						options: {
							name: '[name]',
							prefixize: false
						}
					}
				]
			},

			{
				test: /\.svg$/,
				use: [
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