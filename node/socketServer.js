module.exports = (server) => {
    var io = require('socket.io')(server);
    io.on('connection', function(socket){
        console.log("Connection received from client");
        socket.on('register-identifier', function(clientId) {
            console.log(`Received client id ${clientId} for socket id ${socket.id}`);
        });
    });

    let num = 0;
    setInterval(() => io.emit('test-message', `Message ${++num}`), 5000);
};