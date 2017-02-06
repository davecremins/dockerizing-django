module.exports = (config) => {
    var server = require('http').createServer(require('express')());
    server.listen(config.port, function () {
        console.log("Express server running on port %s", config.port);
    });
    return server;
};