let redis = require('redis');
let redisClientFactory = (redisName) => {
    return redis.createClient({host: redisName});
};

let webSubHandler = (pub, sub, config) => {
    sub.subscribe(config.redisUserChannel);
    sub.on('message', function(channel, message){        
        console.log(`Message from channel '${channel}' received for node_agg: ${message}`);
        pub.publish(config.redisAggChannel, message);
    });
};

module.exports = (config) => {
    let pub = redisClientFactory(config.redis), 
        sub = redisClientFactory(config.redis);

    webSubHandler(pub, sub, config);
};