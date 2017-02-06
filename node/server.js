var config = require('./config.json');
var server = require('./services/httpServer.js')(config);
require('./services/socketServer.js')(server);
require('./services/redisBus.js')(config);