var http = require("http")
var npmlog = require("npmlog")
declare var http: any
http.createServer((req: any, res: any) => {
	res.writeHead(200)
	res.end("Hello, world!")
})
npmlog.info("Server", "Main")