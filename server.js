const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

//create server
const app = express();

app.use(
	createProxyMiddleware('http://localhost:8080/api', {
		target: 'http://market-balgyeon-back.herokuapp.com/',
		changeOrigin:true,
		pathRewrite: {
			'^/api' : '',
		} 
	})	
);

//set production env
app.use(express.static(path.join(__dirname, "./dist")));
app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

//start server
app.listen({ port:process.env.PORT || 8080 }, () =>
	console.log(`Server ready ${process.env.PORT || 8080}`)
);