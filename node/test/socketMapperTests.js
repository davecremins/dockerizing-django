let expect = require('expect.js'),
    socketMapper = require('../socketMapper.js');

describe('SocketMapper', function () {
   it('adding mapper should return correctly mapped object', function () {
      let socketId = '1234_XYZA83473';
      
      socketMapper.addSocketForId({
        id: socketId,
        func: () => {}}, 
        1
      );

      let socket = socketMapper.getSocketForId(1);

      expect(socket.id).to.eql(socketId);
   });

   it('overwrite socket mapping occurs when same id is used', function () {
      let socketId = '1234_XYZA83111';
      
      socketMapper.addSocketForId({
        id: socketId,
        func: () => {}}, 
        1
      );

      let socket = socketMapper.getSocketForId(1);

      expect(socket.id).to.eql(socketId);
   });
});