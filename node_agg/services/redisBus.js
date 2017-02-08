let redis = require('redis');

let redisClientFactory = (config) => {
    return redis.createClient({host: config.redis});
};

module.exports = (config) => {
    let sub = redisClientFactory(config), pub = redisClientFactory(config);
    sub.subscribe(config.redisCommName);
    sub.on('message', function(channel, message){        
        console.log(`Message received for node_agg: ${message}`);
        pub.publish(config.redisService, message); 
    });
};