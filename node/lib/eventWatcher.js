let EventEmitter = require('events').EventEmitter,
    util = require('util');

let EventWatcher = function () { };
util.inherits(EventWatcher, EventEmitter);

let singleton;
module.exports = {
   getInstance: function(){
      return singleton || (singleton = new EventWatcher());
   }
}; 