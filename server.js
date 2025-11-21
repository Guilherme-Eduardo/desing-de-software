const http = require ("http");

const server = http.createServer((req, res) => {
	res.end("Hello Worls do NOde.js!");
});

server.listen(3000, () => {
	console.log("Servidor rodando em htto://localhost:3000");
});
