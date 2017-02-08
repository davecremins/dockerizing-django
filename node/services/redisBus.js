let redis = require('redis'),
    eventPubSub = require('../lib/eventPubSub.js').getInstance();

let redisClientFactory = (config) => {
    return redis.createClient({host: config.redis});
};

let subHandler = (sub, config) => {
    sub.subscribe(config.redisAggChannel);
    sub.on('message', function(channel, message){        
        console.log(`Redis message from channel '${channel}' received for node: ${message}`);
        eventPubSub.emit('redisMessage', message);
    });
};

let pubHandler = (pub, config) => {
    // eventPubSub.on('twitter-data', (data) => {
    //     pub.publish(config.redisAggChannel, data);
    // });
};

module.exports = (config) => {
    subHandler(redisClientFactory(config), config);
    pubHandler(redisClientFactory(config), config);
};