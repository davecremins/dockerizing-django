var config = require('./config.json');
var server = require('./services/httpServer.js')(config);
require('./services/socketServer.js')(server);
require('./services/redisBus.js')(config);

var twitterService = require('./services/twitterStreamingService.js');
twitterService.start();
twitterService.events.on('newTweet', (tweet)=>{
    console.log(`Tweet text: ${tweet.text}`);
    console.log(`Tweet coordinates: ${tweet.coordinates}`);
    console.log(`Tweet location: ${tweet.user.location}`);
});