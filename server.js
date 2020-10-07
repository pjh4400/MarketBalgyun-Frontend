const path = require('path');
const express = require('express');

//create server
const app = express();

//set production env
app.use(express.static(path.join(__dirname, "./dist")));
app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

//start server
app.listen({ port:process.env.PORT || 8080 }, () =>
	console.log(`Server ready ${process.env.PORT || 8080}`)
);