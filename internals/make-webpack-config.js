var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
//const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var SplitByPathPlugin = require('webpack-split-by-path');
var OptimizeJsPlugin = require("optimize-js-plugin");
var fs = require("fs");

var cssnext = require('postcss-cssnext');
var stylus = require('stylus');

module.exports = function(options) {
	var staticFilesName = "[hash]",
		cssFilesSuffixName = ".[contenthash]",
		jsFilesSuffixName = ".[chunkhash]";

	if ((options.disableOffline)||(options.debug)){
		staticFilesName = "[name]";
		cssFilesSuffixName = "";
		jsFilesSuffixName = "";
	}

	var loaders = {
		'files': {test: /\.(eot|woff|ttf)$/, loader: "file-loader?name=assets/"+staticFilesName+".[ext]"},
		'stylus': { test: /\.styl$/, loader: "style-loader!css-loader!postcss-loader!stylus-loader" },
		'babel': {
			test: /\.jsx?$/,
			loader: 'babel',
			/*query: {
				cacheDirectory: '/temp/',
				presets: ['react', 'es2015', 'survivejs-kanban']
			},*/
			exclude: /node_modules/
		},
		'svg': {
			test: /.*\.svg$/,
			loaders: [
				'svg-sprite?' + JSON.stringify({
					name: '[name]',
					prefixize: false
				}),
				"image-webpack?" + JSON.stringify({
					svgo: {
						plugins: [
							{transformsWithOnePath: true},
							{removeTitle: true},
							{removeUselessStrokeAndFill: true},
							{
								removeAttrs: {attrs: '(stroke|fill)'}
							},
							{removeViewBox:false}
							//{convertPathData: false}
						]
					}
				})
			]
		},
		'img': {
			test: /.*\.(gif|png|jpe?g|ico)$/i,
			loaders: [
				'file?hash=sha512&digest=hex&name=assets/'+staticFilesName+'.[ext]'
		    ]
		},
		'masonry': {
	        test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
	        loader: 'imports?define=>false&this=>window'
	    },
	    'md': {
	    	test: /\.md$/,
	    	loader: "html!markdown"
	    }
	};
	var plugins = [
		//new StaticSiteGeneratorPlugin('main', ['index.html']),
		//index.html
		new HtmlWebpackPlugin({
			title: "Raindrop.io",
			template: './index.ejs',
			favicon: './assets/icons/favicon.ico',
			hash: false,//!options.debug
			inject: 'head',
			/*minify: (!options.debug ? {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			} : {})*/
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer'
		}),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new webpack.ExternalsPlugin('commonjs', ['electron']),
		new SplitByPathPlugin([
			{
				name: 'vendor',
				path: path.join(__dirname, '/../node_modules')
			},{
				name: 'languages',
				path: path.join(__dirname, '/../src/languages')
			}, {
				manifest: 'app-entry'
			}
		])
	];

	var aboutJSON = JSON.parse(fs.readFileSync(__dirname+'/../package.json', 'utf8'));
	plugins.push(new webpack.DefinePlugin({
		__ABOUT__: JSON.stringify({
			version: aboutJSON.version
		})
	}));

	//only for dev purpose
	if (options.debug==true){
		plugins.push(new WriteFilePlugin());
		plugins.push(new webpack.DefinePlugin({
			__TARGET__ : JSON.stringify(options.target||"default"),
			__DEV__: JSON.stringify(true)
		}));

		loaders.reactPerf = {
			test: require.resolve("react-addons-perf"),
			loader: "expose?Perf"
		}

		//loaders.babel.query.presets.push("react-hmre");
		//plugins.push(new webpack.HotModuleReplacementPlugin());
	}
	else{
		plugins.push(new webpack.DefinePlugin({
			__DEV__: JSON.stringify(false),
			__TARGET__ : JSON.stringify(options.target||"default"),
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}));

		//Image
		loaders.img.loaders.push('image-webpack');

		//Stylus
		loaders.stylus.loader = ExtractTextPlugin.extract("stylus", "css-loader!postcss-loader!stylus-loader");
		plugins.push(new ExtractTextPlugin("assets/[name]"+cssFilesSuffixName+".css", {allChunks: true}));

		plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));

		plugins.push(new webpack.optimize.DedupePlugin());

		if (!options.disableUglify)
		plugins.push(new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			comments: false,
			compress: {
		        warnings: false
		    }
		}));

		plugins.push(new OptimizeJsPlugin({
	        sourceMap: false
	    }))
		
		if (!options.disableOffline)
		plugins.push(new OfflinePlugin({
			excludes: ['**/.*', '**/*.map', '/', 'index.html'],
			publicPath: options.publicPath,
			relativePaths: false,
			AppCache: false
		}));
	}

	//last
	var finalLoaders = [];
	for(var i in loaders)
		finalLoaders.push(loaders[i]);

	var publicPath;
	if (typeof options.publicPath != "undefined")
		publicPath = options.publicPath;

	//Code splitting
	var entry = {
		'main': './index',
		'analytics': './analytics'
	}
	entry = Object.assign(entry, options.additionalEntries||{});

	//Return configure
	return {
		cache: true/*options.debug*/,
		context: path.join(__dirname, '/../src'),
		entry: entry,

		devServer: Object.assign({
			//disableHostCheck: true,
	        outputPath: path.join(__dirname, options.path)
	    }, options.devServer||{}),

		output: {
			path: path.join(__dirname, options.path),
			filename: (options.debug ? '[name].js' : "assets/[name]"+jsFilesSuffixName+".js"),
			chunkFilename: (options.debug ? '[name].js' : "assets/[name]"+jsFilesSuffixName+".js"),
			publicPath: publicPath
			//libraryTarget: 'commonjs2'
			//libraryTarget: 'umd'
		},

		resolve: {
			modulesDirectories: ['node_modules', 'common'],
			extensions:         ['', '.js', '.jsx', '.styl'],
			alias: {
				api: __dirname + '/../src/modules/api.js',
				network: __dirname + '/../src/modules/network.js',
				config: __dirname + '/../src/modules/config.js',
				icon: __dirname + '/../src/co/common/icon.jsx',
				t: __dirname + '/../src/modules/translate.js'
			}
		},

		devtool: options.devtool,
		debug: options.debug||false,
		//target: 'electron-renderer',

		module: {
			noParse: /node_modules\/localforage\/dist\/localforage.js/,
			loaders: finalLoaders
		},

		postcss: function () {
	        return [cssnext({
				browsers: ['last 2 versions', 'IE > 10'],
				features: {
					customProperties: {
						strict: false,
						preserve: true,
						warnings: false
					}
				}
		    })];
	    },

		plugins: plugins,
		target: 'web',
		progress: true
	}
};