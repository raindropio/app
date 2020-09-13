const path = require('path')

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')

//defaults
process.env.SENTRY_RELEASE = String(new Date().getTime())

module.exports = ({ env='development', filename='[name].[contenthash]' }) => ({
	mode:		env,
	context:	path.resolve(__dirname, '../src'),
	devtool:	env == 'production' ? 'source-map' : 'cheap-module-eval-source-map',
	
	entry: {
		app: './index.js'
	},
	
	output: {
		filename:	`assets/${filename}.js`
	},

	devServer: {
		compress: false,
		disableHostCheck: true,
		historyApiFallback: true,
		//hot: true,inline: true,
		overlay: true,
		port: 2000
	},

	performance: {
		hints: env == 'production' ? 'error' : false,
		maxEntrypointSize: 2000000,
		maxAssetSize: 2000000
	},

	optimization: {
		minimize: env == 'production',
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
		//pre plugins
		...(env == 'production' ? [
			//Clean dist folder
			new CleanWebpackPlugin(),

			//Sentry
			new SentryCliPlugin({
				release: process.env.SENTRY_RELEASE,
				dryRun: env != 'production',
				include: './src',
				ignore: [ 'node_modules', 'build', 'dist' ],
				configFile: path.resolve(__dirname, 'sentry.properties'),
			})
		] : []),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env),
			RAINDROP_ENVIRONMENT: JSON.stringify('browser')
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
			filename: `${filename}.css`,
			chunkFilename: `assets/${filename}.css`
		})
	],

	module: { rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			oneOf: [
				{
					resourceQuery: /asis/,
					loader: 'file-loader',
					options: {
						outputPath: 'assets',
						name: `${filename}.[ext]`
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
				...(env=='production' ? [{
					loader: MiniCssExtractPlugin.loader
				}] : ['style-loader']),
				{
					loader: 'css-loader',
					options: {
						modules: {
							auto: true,
							localIdentName: '[local]-[hash:base64:4]'
						}
					}
				},
				'postcss-loader',
				'stylus-loader',
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
						name: `${filename}.[ext]`
					}
				},
				{
					resourceQuery: /component/,
					use: ['@svgr/webpack']
				},
				{
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
						name: `${filename}.[ext]`
					}
				},
				{
					loader: 'image-webpack-loader',
					options: {
						disable: env!='production'
					},
				},
			],
		},

		{
			test: /.*\.(woff2)$/i,
			use: [
				{
					loader: 'file-loader',
					options: {
						outputPath: 'assets',
						name: `${filename}.[ext]`
					}
				}
			],
		}
	] }
})