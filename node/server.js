var config = require('./config.json');
var server = require('./httpServer.js')(config);
require('./socketServer.js')(server);
require('./redisBus.js')(config);