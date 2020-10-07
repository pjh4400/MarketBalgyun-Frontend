const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target:'https://marketback.herokuapp.com/',
			changeOrigin:true,
		})
	);
};