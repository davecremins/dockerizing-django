let expect = require('expect.js'),
    tweetFilter = require('../lib/tweetFilter.js');

describe('TweetFilter', function () {
   it('filter should return null for tweet with no co-ordinates', function () {
      let tweet = {
          text: 'abc',
          user: {
              geo_enabled: false
          }
      };

      let result = tweetFilter.filter(tweet);
      expect(result).to.be.equal(null);
   });
   
   it('filter should return tweet when tweet has co-ordinates', function () {
      let tweet = {
          text: 'abc',
          user: {
              geo_enabled: false
          },
          coordinates: ''
      };

      let result = tweetFilter.filter(tweet);
      expect(result).not.equal(null);
   });
});