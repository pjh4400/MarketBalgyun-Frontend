const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
	console.log('plzzzzzzzzz');
	app.use(
		createProxyMiddleware('http://localhost:8080/api', {
			target: 'https://marketback.herokuapp.com/',
			changeOrigin:true,
			pathRewrite: {
				'^/api' : '',
			}
		})	
	);
};