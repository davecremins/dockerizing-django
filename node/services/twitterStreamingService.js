let Twit = require('twit');
 
let twitter = new Twit({
  consumer_key: process.env.twit_consumer_key,
  consumer_secret: process.env.twit_consumer_secret,
  access_token: process.env.twit_access_token,
  access_token_secret: process.env.twit_access_token_secret
});

let service = () => {
    // Geopoint calculation uing twitters long/lat convention - 20 KM distance
    let location = [ '-8.873204', '52.399176', '-7.918104', '52.978103' ]; 
    let stream = twitter.stream('statuses/filter', { locations: location });
    stream.on('tweet', function (tweet) {
        console.log(`Tweet text: ${tweet.text}`);
        console.log(`Tweet location: ${tweet.user.location}`);
    });
};

module.exports = {
    start: () => {
        service();
    }
};