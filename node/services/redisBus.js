module.exports = (config) => {
    var redis = require('redis');
    var sub = redis.createClient({host: config.redis});
    sub.subscribe(config.redisCommName);
    sub.on('message', function(channel, message){        
        console.log(`Message received: ${message}`);    
    });
};