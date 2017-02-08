let eventWatcher = require('../lib/eventWatcher.js').getInstance();
let socketManager = require('../lib/socketMapper.js');

let addToManager = (socket, id) => {
    socketManager.addSocketForId(socket, id);
};

let redisMessageHandler = (message) => {
    console.log(`redisMessage received by socket service via eventWatcher: ${message}`)
};

module.exports = (server) => {
    let io = require('socket.io')(server);
    io.on('connection', function(socket){
        console.log("Connection received from client");
        socket.on('register-identifier', function(clientId) {
            console.log(`Received client id ${clientId} for socket id ${socket.id}`);
            addToManager(socket, clientId);
        });
    });

    let num = 0;
    setInterval(() => io.emit('test-message', `Message ${++num}`), 5000);

    eventWatcher.on('redisMessage', redisMessageHandler);
};