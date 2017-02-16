let socketManager = require('../lib/socketMapper.js');

let addToManager = (socket, id) => {
    socketManager.addSocketForId(socket, id);
    console.log(`Client id ${id} for socket id ${socket.id} has been added to manager`);
};

let pingUser = (data) => {
    socketManager.getSocketForId(data.userId).emit('relay-message',`Message: ${data.tags} - Coords: ${data.coords}`);
};

let pingAll = (io) => {
    return (data) => {
        io.emit('test-message', {
            tuser: data.user.name, 
            text: data.text
        });
    };
};

module.exports = (server) => {
    let io = require('socket.io')(server);
    io.on('connection', function(socket){
        socket.on('register-identifier', function(clientId) {
            addToManager(socket, clientId);
        });
    });

    return {
        pingUser,
        pingAll: pingAll(io)
    };
};