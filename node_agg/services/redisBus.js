let redis = require('redis');

let redisClientFactory = (config) => {
    return redis.createClient({host: config.redis});
};

let webSubHandler = (pub, sub, config) => {
    sub.subscribe(config.redisUserChannel);
    sub.on('message', function(channel, message){        
        console.log(`Message from channel '${channel}' received for node_agg: ${message}`);
        pub.publish(config.redisAggChannel, message);
    });
};

module.exports = (config) => {
    let pub = redisClientFactory(config), 
        sub = redisClientFactory(config);

    webSubHandler(pub, sub, config);
    //servicePubHandler(pub, config);
};