import http from "http"
import npmlog from "npmlog"

const requestListener = function (req, res) {
	res.writeHead(200)
	res.end("Hello, World!")
}

const server = http.createServer(requestListener)
server.listen(80)

npmlog.info("I'm ready!")