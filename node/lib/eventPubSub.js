let EventEmitter = require('events').EventEmitter,
    util = require('util');

let EventSystem = function () { };
util.inherits(EventSystem, EventEmitter);

let singleton;
module.exports = {
   getInstance: function(){
      return singleton || (singleton = new EventSystem());
   }
}; 