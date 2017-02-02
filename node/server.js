var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var sub = redis.createClient({host: 'redis'});

var port = 4000;
server.listen(port, function () {
   console.log("Express server running on port %s", port);
});

io.on('connection', function (socket) {
    console.log('socket connection received');
});
 
sub.subscribe('comms');
//Grab message from Redis and send to client
sub.on('message', function(channel, message){        
    console.log(`Message received: ${message}`);    
});
 
//Configure socket.io to store cookie set by Django
// io.configure(function(){
//     io.set('authorization', function(data, accept){
//         if(data.headers.cookie){
//             data.cookie = cookie_reader.parse(data.headers.cookie);
//             return accept(null, true);
//         }
//         return accept('error', false);
//     });
//     io.set('log level', 1);
// });
 
// io.sockets.on('connection', function (socket) {
//     //Grab message from Redis and send to client
//     sub.on('message', function(channel, message){
//         console.log('Message received: ${message}');
//         socket.send(message);
//     });
// });