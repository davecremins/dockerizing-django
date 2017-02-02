// var http = require('http');
// var server = http.createServer().listen(4000);
// var io = require('socket.io').listen(server);
 
var redis = require('redis');
var sub = redis.createClient();

//io.adapter(redis({ host: 'localhost', port: 6379 }));
 
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