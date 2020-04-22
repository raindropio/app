process.env.NODE_ENV = "development";

var config = {
	devtool: "eval",
	path: '../build/'+(process.env.RAIN_PLATFORM||'dev'),
	//publicPath: 'http://dev.raindrop.io',
	debug: true
};

if (process.env.RAIN_PLATFORM.indexOf('clipper')==0){
	var isHttps = (process.env.RAIN_PLATFORM.indexOf('chrome')!=-1);
	var protocol = (isHttps ? "https" : "http");

	config.publicPath = protocol+"://localhost:80/";
	config.devServer = {
		publicPath: protocol+"://localhost:80/",
		https: isHttps
	}
}

module.exports = require("./make-webpack-config")(config);