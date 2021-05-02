const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')

//defaults
process.env.SENTRY_RELEASE = String(new Date().getTime())

module.exports = ({ production, filename='[name].[contenthash]', sentry={} }) => ({
	mode:		production ? 'production' : 'development',
	context:	path.resolve(__dirname, '../src'),
	devtool:	production ? 'source-map' : 'eval-cheap-module-source-map',
	
	entry: {
		app: './index.js'
	},
	
	output: {
		filename:	`assets/${filename}.js`,
		clean:		true
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
		hints: production ? 'error' : false,
		maxEntrypointSize: 2000000,
		maxAssetSize: 2000000
	},

	optimization: {
		minimize: production,
		minimizer: [
			new TerserJSPlugin({
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin({})
		],
		runtimeChunk: false
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
		...(production ? [
		] : [
		]),

		//Sentry
		...(production ? [
			new SentryCliPlugin({
				org: 'oblako-corp',
				project: 'app',
				authToken: process.env.SENTRY_AUTH_TOKEN, //required in CI environment
				release: process.env.SENTRY_RELEASE,

				include: './src',
				ignore: [ 'node_modules', 'build', 'dist' ],
				configFile: path.resolve(__dirname, 'sentry.properties'),
				...sentry
			})
		]: []),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(production?'production':'development'),
			'process.env.SENTRY_RELEASE': JSON.stringify(process.env.SENTRY_RELEASE),
			RAINDROP_ENVIRONMENT: JSON.stringify('browser')
		}),

		//HTML
		new HtmlWebpackPlugin({
			title: 'Raindrop.io',
			template: './index.ejs',
			hash: true,
			scriptLoading: 'defer',
			inject: 'head', //head better for extension
			excludeChunks: ['manifest', 'background']
		}),

		//CSS
		new MiniCssExtractPlugin({
			filename: `assets/${filename}.css`,
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
					resourceQuery: /raw/,
					loader: 'raw-loader'
				},
				{
					loader: 'babel-loader',
					options: {
						envName: production ? 'production' : 'development'
					}
				}
			]
		},

		{
			test: /\.(styl|css)$/,
			sideEffects: true,
			use: [
				...(production ? [{
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
						disable: !production
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