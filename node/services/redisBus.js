let eventWatcher = require('../lib/eventWatcher.js').getInstance();

module.exports = (config) => {
    var redis = require('redis');
    var sub = redis.createClient({host: config.redis});
    sub.subscribe(config.redisService);
    sub.on('message', function(channel, message){        
        console.log(`Redis message from channel '${channel}' received for node: ${message}`);
        eventWatcher.emit('redisMessage', message);
    });
};