process.env.NODE_ENV = "production";

module.exports = require("./make-webpack-config")({
	publicPath: '',
	path: '../../Clipper/appbuild',
	//path: '../../Mini/app',
	target: "clipper",
	disableOffline: true
});