process.env.NODE_ENV = "production";

module.exports = require("./make-webpack-config")({
	publicPath: '',
	path: '../../Desktop/app/app',
	target: "desktop"
});