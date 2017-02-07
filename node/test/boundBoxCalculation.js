let expect = require('expect.js'),
    geopoint = require('geopoint');

describe('Bounding Box Calculation', function () {
   it('bounding box is calculated for gps coords for limerick', function () {
       let point = new geopoint(52.688640, -8.3956545);
       console.log(point._degLat);
       console.log(point._degLon);
       let result = point.boundingCoordinates(20);
       console.log(result);
       //expect(socket.id).to.eql(socketId);
   });
});