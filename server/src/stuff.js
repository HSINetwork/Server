"use strict";
var http = require("http");
var npmlog = require("npmlog");
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Hello, world!");
});
npmlog.info("Server", "Main");
