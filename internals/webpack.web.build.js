process.env.NODE_ENV = "production";

module.exports = require("./make-webpack-config")({
	publicPath: '/',
	path: '../build/web',
	devtool: "source-map"
})