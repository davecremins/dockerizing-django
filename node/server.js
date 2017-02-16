let config = require('./config.json'),
    server = require('./services/httpServer.js')(config),
    socketServer = require('./services/socketServer.js')(server);

let redisBus = require('./services/redisBus.js')(config);
redisBus.events.on('redisMessage', (message) => {
    let data = JSON.parse(message);
    if(data.userId) {
        socketServer.pingUser(data);
    } else {
        console.log('redisMessage received but there was no id associated with it');
    }
});

let twitterService = require('./services/twitterStreamingService.js');
twitterService.start();
twitterService.events.on('newTweet', (tweet) => {
    console.log(`Tweet text: ${tweet.text}`);
    console.log(`Tweet coordinates: ${tweet.coordinates}`);
    console.log(`Tweet location: ${tweet.user.location}`);
    socketServer.pingAll(tweet);
});