let redis = require('redis'),
    eventManager = require('../lib/eventPubSub.js').Factory.create();

let redisClientFactory = (config) => {
    return redis.createClient({host: config.redis});
};

let subHandler = (sub, config) => {
    sub.subscribe(config.redisAggChannel);
    sub.on('message', function(channel, message){        
        console.log(`Redis message from channel '${channel}' received for node: ${message}`);
        eventManager.emit('redisMessage', message);
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

    return {
        events: eventManager
    };
};