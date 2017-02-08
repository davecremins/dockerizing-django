let eventPubSub = require('./eventPubSub.js').getInstance();

let processor = (tweet) => {
    if(tweet !== null){
        console.log(`Tweet text: ${tweet.text}`);
        console.log(`Tweet coordinates: ${tweet.coordinates}`);
        console.log(`Tweet location: ${tweet.user.location}`);
        eventPubSub.emit('twitter-data', tweet);
    } else {
        console.log('Tweet filtered');
    }
};

module.exports = {
    process: processor
};