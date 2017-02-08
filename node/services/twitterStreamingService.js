let Twit = require('twit'),
    tweetFilter = require('../lib/tweetFilter.js'),
    tweetOperator = require('../lib/tweetOperator.js');
 
let twitter = new Twit({
  consumer_key: process.env.twit_consumer_key,
  consumer_secret: process.env.twit_consumer_secret,
  access_token: process.env.twit_access_token,
  access_token_secret: process.env.twit_access_token_secret
});

let stream;

let startStreamService = () => {
    // Geopoint calculation using twitters long/lat convention - 20 KM distance
    let location = [ '-8.873204', '52.399176', '-7.918104', '52.978103' ]; 
    stream = twitter.stream('statuses/filter', { locations: location });
    stream.on('tweet', function (tweet) {
        let fTweet = tweetFilter.filter(tweet);
        tweetOperator.process(fTweet);
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
    }
};