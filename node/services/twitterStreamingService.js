let Twit = require('twit'),
    tweetFilter = require('../lib/tweetFilter.js'),
    eventFactory = require('../lib/eventPubSub').Factory,
    twitter = null;
 
try{
    twitter = new Twit({
    consumer_key: process.env.twit_consumer_key,
    consumer_secret: process.env.twit_consumer_secret,
    access_token: process.env.twit_access_token,
    access_token_secret: process.env.twit_access_token_secret
    });
} catch(e){
    console.error(`Error occured with Twit: ${e}`);
    twitter = {
        stream: () => {
            console.log(`Defaulting to no stream`);
        },
        stop: () => {
            console.log(`Stopping default stream`);
        }
    };
} 

let stream, eventManager = eventFactory.create();

let startStreamService = () => {
    // Geopoint calculation using twitters long/lat convention - 20 KM distance
    let location = [ '-8.873204', '52.399176', '-7.918104', '52.978103' ]; 
    stream = twitter.stream('statuses/filter', { locations: location });
    stream.on('tweet', function (tweet) {
        let fTweet = tweetFilter.filter(tweet);
        if(fTweet){
            eventManager.emit('newTweet', fTweet);
        } else{
            console.log('Tweet filtered :(');
        }
    });
    console.log('Streaming service started...');
};

let stopStreamService = () => {
    stream.stop();
    console.log('Streaming service stopped...');
};

module.exports = {
    start: () => {
        startStreamService();
    },
    stop: () =>{
        stopStreamService();
    },
    events: eventManager
};