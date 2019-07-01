const http = require('http');
const Router = require('./router');
const handlers = require('./handlers');
const colors = require('colors');





const router = new Router([
	//
	// Main app functionality
	{	
		// home page
		pattern: /^\/$/gi,
		exec: handlers.homePage
	},
	{	
		// form upload
		pattern: /^\/upload$/gi,
		exec: handlers.uploadImage
	},
	{	
		// serve image
		pattern: /^\/images\/(.)*[.][a-z/0-9]{1,}/gi,
		exec: handlers.getImage
	},
	//
	// serve assets
	{	
		// serve bootstrap css file
		pattern: /^\/static\/bootstrap.min.css$/gi,
		exec: handlers.getBootstrap
	},
	{	
		// serve main css file
		pattern: /^\/static\/style.css$/gi,
		exec: handlers.getMainStyle
	},
	//
	// default error handlers
	{	
		exec: handlers.error
	}
]);




module.exports.start = function(port) {
	http.createServer(router.pipeRequest).listen(port);
	console.log(`Server listening on ${port} `.green);
}
