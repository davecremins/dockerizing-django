// Setup express and socket.io
var server = require('http').createServer(require('express')());
var io = require('socket.io')(server);

var port = 4000;
server.listen(port, function () {
   console.log("Express server running on port %s", port);
});

io.on('connection', function (socket) {
    console.log('socket connection received');
});

// Setup redis Pub/Sub bus
var redis = require('redis');
var sub = redis.createClient({host: 'redis'});
sub.subscribe('comms');
sub.on('message', function(channel, message){        
    console.log(`Message received: ${message}`);    
});